import { logger } from "@cs-magic/log/logger";
import * as PUPPET from "wechaty-puppet";
import { log } from "wechaty-puppet";
import { FileBox } from "file-box";
import { PadLocalClient, Log as PadLocalLog } from "padlocal-client-ts";
import PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import { genIdempotentId } from "padlocal-client-ts/dist/utils/Utils.js";
import { AppMessageType } from "../../wechaty-puppet/src/extra/message";
import { CacheManager } from "./padlocal/cache-manager.js";
import { isIMContactId, isRoomId } from "./padlocal/utils/is-type.js";
import { parseAppmsgMessagePayload } from "./padlocal/messages/message-appmsg.js";
import { parseMiniProgramMessagePayload } from "./padlocal/messages/message-miniprogram.js";
import { parseEvent, EventType } from "./padlocal/events/mod.js";
import * as XMLParser from "fast-xml-parser";
import { generateEmotionPayload, parseEmotionMessagePayload, } from "./padlocal/messages/message-emotion.js";
import { hexStringToBytes } from "padlocal-client-ts/dist/utils/ByteUtils.js";
import { CachedPromiseFunc } from "./padlocal/utils/cached-promise.js";
import { SerialExecutor } from "padlocal-client-ts/dist/utils/SerialExecutor.js";
import { isRoomLeaveDebouncing } from "./padlocal/events/event-room-leave.js";
import { WechatMessageType } from "./padlocal/types.js";
import { RetryStrategy, RetryStrategyRule } from "padlocal-client-ts/dist/utils/RetryStrategy.js";
import nodeUrl from "url";
import { addRunningPuppet, removeRunningPuppet } from "./cleanup.js";
import { packageJson } from "./package-json.js";
import { padLocalMessageToWechaty } from "./padlocal/schema-mapper/message.js";
import { padLocalContactToWechaty } from "./padlocal/schema-mapper/contact.js";
import { chatRoomMemberToContact, padLocalRoomMemberToWechaty, padLocalRoomToWechaty, } from "./padlocal/schema-mapper/room.js";
const VERSION = packageJson.version || "0.0.0";
const PRE = "[PuppetPadlocal]";
const SEARCH_CONTACT_PREFIX = "$search$-";
const STRANGER_SUFFIX = "@stranger";
const logLevel = process.env["PADLOCAL_LOG"];
if (logLevel) {
    log.level(logLevel.toLowerCase());
    log.silly(PRE, "set level to %s", logLevel);
}
PadLocalLog.setLogger(log);
class PuppetPadlocal extends PUPPET.Puppet {
    options;
    static log = PadLocalLog;
    _client;
    _cacheMgr;
    _onPushSerialExecutor = new SerialExecutor();
    _printVersion = true;
    _restartStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, Number.MAX_SAFE_INTEGER);
    _heartBeatTimer;
    constructor(options = {}) {
        super(options);
        this.options = options;
        // try to fill token from env if not exits
        if (!this.options.token) {
            const token = process.env["WECHATY_PUPPET_PADLOCAL_TOKEN"];
            if (!token) {
                log.error("PuppetPadlocal", `

      WECHATY_PUPPET_PADLOCAL_TOKEN environment variable not found.

      PadLocal need a token before it can be used,
      Please set WECHATY_PUPPET_PADLOCAL_TOKEN then retry again.

    `);
                throw new Error("You need a valid WECHATY_PUPPET_PADLOCAL_TOKEN to use PuppetPadlocal");
            }
            this.options.token = token;
        }
        const endpoint = options.endpoint || process.env["WECHATY_PUPPET_PADLOCAL_ENDPOINT"];
        if (endpoint) {
            process.env["PADLOCAL_ENDPOINT"] = endpoint;
        }
        const serverCAFilePath = options.serverCAFilePath || process.env["WECHATY_PUPPET_PADLOCAL_CA_FILE_PATH"];
        if (serverCAFilePath) {
            process.env["PADLOCAL_CA_FILE_PATH"] = serverCAFilePath;
        }
    }
    get client() {
        return this._client;
    }
    async onStart() {
        await this._startClient(PadLocal.LoginPolicy.DEFAULT);
    }
    async _startClient(loginPolicy) {
        this._startPuppetHeart();
        addRunningPuppet(this);
        await this._setupClient();
        const ScanStatusName = {
            [PUPPET.types.ScanStatus.Unknown]: "Unknown",
            [PUPPET.types.ScanStatus.Cancel]: "Cancel",
            [PUPPET.types.ScanStatus.Waiting]: "Waiting",
            [PUPPET.types.ScanStatus.Scanned]: "Scanned",
            [PUPPET.types.ScanStatus.Confirmed]: "Confirmed",
            [PUPPET.types.ScanStatus.Timeout]: "Timeout",
        };
        const onQrCodeEvent = async (qrCodeEvent) => {
            let scanStatus = PUPPET.types.ScanStatus.Unknown;
            let qrCodeImageURL;
            switch (qrCodeEvent.getStatus()) {
                case PadLocal.QRCodeStatus.NEW:
                    qrCodeImageURL = qrCodeEvent.getImageurl();
                    scanStatus = PUPPET.types.ScanStatus.Waiting;
                    break;
                case PadLocal.QRCodeStatus.SCANNED:
                    scanStatus = PUPPET.types.ScanStatus.Scanned;
                    break;
                case PadLocal.QRCodeStatus.CONFIRMED:
                    scanStatus = PUPPET.types.ScanStatus.Confirmed;
                    break;
                case PadLocal.QRCodeStatus.CANCELLED:
                    scanStatus = PUPPET.types.ScanStatus.Cancel;
                    break;
                case PadLocal.QRCodeStatus.EXPIRED:
                    scanStatus = PUPPET.types.ScanStatus.Timeout;
                    break;
            }
            log.silly(PRE, `scan event, status: ${ScanStatusName[scanStatus]}${qrCodeImageURL ? ", with qrcode: " + qrCodeImageURL : ""}`);
            this.emit("scan", {
                qrcode: qrCodeImageURL,
                status: scanStatus,
            });
        };
        const LoginTypeName = {
            [PadLocal.LoginType.QRLOGIN]: "QrLogin",
            [PadLocal.LoginType.AUTOLOGIN]: "AutoLogin",
            [PadLocal.LoginType.ONECLICKLOGIN]: "OneClickLogin",
        };
        if (loginPolicy === PadLocal.LoginPolicy.DEFAULT && this.options.defaultLoginPolicy !== undefined) {
            loginPolicy = this.options.defaultLoginPolicy;
        }
        this._client.api.login(loginPolicy, {
            onLoginStart: (loginType) => {
                log.info(PRE, `start login with type: ${LoginTypeName[loginType]}`);
            },
            onLoginSuccess: async (_) => {
                this.wrapAsync(this._onPushSerialExecutor.execute(async () => {
                    const userName = this._client.selfContact.getUsername();
                    log.silly(PRE, `login success: ${userName}`);
                    await this.login(this._client.selfContact.getUsername());
                    log.silly(PRE, "login success: DONE");
                }));
            },
            onOneClickEvent: onQrCodeEvent,
            onQrCodeEvent,
            // Will sync message and contact after login success, since last time login.
            onSync: async (syncEvent) => {
                this.wrapAsync(this._onPushSerialExecutor.execute(async () => {
                    log.silly(PRE, `login sync event: ${JSON.stringify(syncEvent.toObject())}`);
                    for (const contact of syncEvent.getContactList()) {
                        await this._onPushContact(contact);
                    }
                    for (const message of syncEvent.getMessageList()) {
                        await this._onPushMessage(message);
                    }
                }));
            },
        })
            .then(() => {
            this.wrapAsync(this._onPushSerialExecutor.execute(async () => {
                log.silly(PRE, "on ready");
                this.emit("ready", {
                    data: "ready",
                });
            }));
            return null;
        })
            .catch(async (error) => {
            log.error(`start client failed: ${error.stack}`);
            await this._stopClient(!!this.options.restartOnFailure);
        });
    }
    /**
     * called internally while login success
     * @param userId
     * @protected
     */
    async login(userId) {
        this._restartStrategy.reset();
        // create cache manager firstly
        this._cacheMgr = new CacheManager(userId);
        await this._cacheMgr.init();
        await super.login(userId);
        const oldContact = await this._cacheMgr.getContact(this.currentUserId);
        if (!oldContact) {
            await this._updateContactCache(this._client.selfContact.toObject());
        }
    }
    /**
     * stop the bot, with account signed on, will try auto login next time bot start.
     */
    async onStop() {
        await this._stopClient(false);
    }
    async _stopClient(restart) {
        if (this._client) {
            this._client.removeAllListeners();
            await this._client.shutdown();
        }
        this._client = undefined;
        this.__currentUserId = undefined;
        if (this._cacheMgr) {
            await this._cacheMgr.close();
            this._cacheMgr = undefined;
        }
        removeRunningPuppet(this);
        this._stopPuppetHeart();
        if (restart && this._restartStrategy.canRetry()) {
            setTimeout(() => {
                // one-click login after failure is strange, so skip it.
                this.wrapAsync(this._startClient(PadLocal.LoginPolicy.SKIP_ONE_CLICK));
            }, this._restartStrategy.nextRetryDelay());
        }
    }
    /**
     * logout account and stop the bot
     */
    async logout() {
        if (!this.isLoggedIn) {
            return;
        }
        await this._client.api.logout();
        this.emit("logout", { contactId: this.currentUserId, data: "logout by self" });
        await this._stopClient(true);
    }
    ding(_data) {
        // TODO: add checking healthy
        this.emit("dong", { data: "Everything is ok" });
    }
    /****************************************************************************
     * contact
     ***************************************************************************/
    async contactSelfName(name) {
        await this._client.api.updateSelfNickName(name);
        this._client.selfContact.setNickname(name);
        const contact = await this.contactRawPayload(this._client.selfContact.getUsername());
        contact.nickname = name;
        await this._updateContactCache(contact);
    }
    async contactSelfQRCode() {
        const response = await this._client.api.getContactQRCode(this._client.selfContact.getUsername(), 1);
        const fileBox = FileBox.fromBuffer(Buffer.from(response.getQrcode()), `qr-${this.currentUserId}.jpg`);
        return fileBox.toQRCode();
    }
    async contactSelfSignature(signature) {
        await this._client.api.updateSelfSignature(signature);
        this._client.selfContact.setSignature(signature);
        const contact = await this.contactRawPayload(this._client.selfContact.getUsername());
        contact.signature = signature;
        await this._updateContactCache(contact);
    }
    async contactAlias(contactId, alias) {
        const contact = await this.contactRawPayload(contactId);
        if (alias) {
            // contact is stranger, set alias in cache, to update after user is added
            if (contact.username.indexOf(STRANGER_SUFFIX) !== -1) {
                await this._cacheMgr.setContactStrangerAlias(contact.username, alias);
                // to suppress warning: 15:31:06 WARN Contact alias(asd3) sync with server fail: set(asd3) is not equal to get()
                if (contactId.startsWith(SEARCH_CONTACT_PREFIX)) {
                    const searchContact = await this._cacheMgr?.getContactSearch(contactId);
                    if (searchContact && searchContact.contact) {
                        searchContact.contact.remark = alias;
                        await this._cacheMgr.setContactSearch(contactId, searchContact);
                    }
                }
            }
            else {
                await this._client.api.updateContactRemark(contact.username, alias);
                contact.remark = alias;
                await this._updateContactCache(contact);
            }
        }
        else {
            return contact.remark;
        }
    }
    async contactAvatar(contactId, file) {
        if (file) {
            throw new Error("set avatar is not unsupported");
        }
        const contact = await this.contactRawPayload(contactId);
        return FileBox.fromUrl(contact.avatar, { name: `avatar-${contactId}.jpg` });
    }
    async contactList() {
        return this._cacheMgr.getContactIds();
    }
    contactCorporationRemark(contactId, corporationRemark) {
        throw new Error(`contactCorporationRemark(${contactId}, ${corporationRemark}) called failed: Method not supported.`);
    }
    contactDescription(contactId, description) {
        throw new Error(`contactDescription(${contactId}, ${description}) called failed: Method not supported.`);
    }
    contactPhone(contactId, phoneList) {
        throw new Error(`contactPhone(${contactId}, ${phoneList}) called failed: Method not supported.`);
    }
    async contactDelete(contactId) {
        const contact = await this._refreshContact(contactId);
        if (contact.getStranger()) {
            log.warn(`can not delete contact which is not a friend:: ${contactId}`);
            return;
        }
        await this._client.api.deleteContact(contactId);
        await this._refreshContact(contactId);
    }
    /****************************************************************************
     * tag
     ***************************************************************************/
    async tagContactAdd(tagName, contactId) {
        const label = (await this._findTagWithName(tagName, true));
        const contact = await this.contactRawPayload(contactId);
        const contactLabelIds = contact.label
            .split(",")
            .filter((l) => l)
            .map((l) => parseInt(l, 10));
        if (contactLabelIds.indexOf(label.getId()) !== -1) {
            log.warn(`contact: ${contactId} has already assigned tag: ${tagName}`);
            return;
        }
        contactLabelIds.push(label.getId());
        await this._client.api.setContactLabel(contactId, contactLabelIds);
        contact.label = contactLabelIds.join(",");
        await this._updateContactCache(contact);
    }
    async tagContactRemove(tagName, contactId) {
        const label = await this._findTagWithName(tagName);
        if (!label) {
            throw new Error(`can not find tag with name: ${tagName}`);
        }
        const contact = await this.contactRawPayload(contactId);
        const contactLabelIds = contact.label
            .split(",")
            .filter((l) => l)
            .map((l) => parseInt(l, 10));
        const labelIndex = contactLabelIds.indexOf(label.getId());
        if (labelIndex === -1) {
            log.warn(PRE, `contact: ${contactId} has no tag: ${tagName}`);
            return;
        }
        contactLabelIds.splice(labelIndex, 1);
        await this._client.api.setContactLabel(contactId, contactLabelIds);
        contact.label = contactLabelIds.join(",");
        await this._updateContactCache(contact);
    }
    async tagContactDelete(tagName) {
        const label = await this._findTagWithName(tagName, false);
        if (!label) {
            throw new Error(`tag:${tagName} doesn't exist`);
        }
        await this._client.api.removeLabel(label.getId());
        // refresh label list
        await this._getTagList(true);
    }
    async tagContactList(contactId) {
        // the all tag
        if (!contactId) {
            const { labelList } = await this._getTagList(true);
            return labelList.map((l) => l.getName());
        }
        else {
            const contact = await this.contactRawPayload(contactId);
            if (!contact.label || !contact.label.length) {
                return [];
            }
            const contactLabelIds = contact.label
                .split(",")
                .filter((l) => l)
                .map((l) => parseInt(l, 10));
            const { labelList, fromCache } = await this._getTagList();
            let contactLabelList = labelList.filter((l) => contactLabelIds.indexOf(l.getId()) !== -1);
            if (contactLabelList.length === contactLabelIds.length || !fromCache) {
                return contactLabelList.map((l) => l.getName());
            }
            // cached label list is out of date
            const newLabelList = (await this._getTagList(true)).labelList;
            contactLabelList = newLabelList.filter((l) => contactLabelIds.indexOf(l.getId()) !== -1);
            return contactLabelList.map((l) => l.getName());
        }
    }
    /****************************************************************************
     * friendship
     ***************************************************************************/
    async friendshipAccept(friendshipId) {
        const friendship = (await this.friendshipRawPayload(friendshipId));
        const userName = friendship.contactId;
        // FIXME: workaround to make accept enterprise account work. can be done in a better way
        if (isIMContactId(userName)) {
            await this._refreshContact(userName, friendship.ticket);
        }
        await this._client.api.acceptUser(userName, friendship.ticket, friendship.stranger, friendship.scene);
        // after adding friend, new version of contact will be pushed
    }
    async friendshipAdd(contactId, option) {
        let stranger;
        let ticket;
        let addContactScene;
        const cachedContactSearch = await this._cacheMgr.getContactSearch(contactId);
        if (cachedContactSearch) {
            stranger = cachedContactSearch.encryptusername;
            ticket = cachedContactSearch.antispamticket;
            addContactScene = cachedContactSearch.toaddscene;
        }
        else {
            const contactPayload = await this.contactRawPayload(contactId);
            let contactAlias = contactPayload.alias;
            if (!contactAlias) {
                // add contact from room,
                const roomIds = await this._findRoomIdForUserName(contactId);
                if (!roomIds.length) {
                    throw new Error(`Can not find room for contact while adding friendship: ${contactId}`);
                }
                const roomId = roomIds[0];
                const contact = await this._client.api.getChatRoomMember(roomId, contactId);
                await this._updateContactCache(contact.toObject());
                contactAlias = contact.getAlias();
            }
            const res = await this._client.api.searchContact(contactAlias);
            if (!res.getAntispamticket()) {
                throw new Error(`contact:${contactId} is already a friend`);
            }
            stranger = res.getEncryptusername();
            ticket = res.getAntispamticket();
            addContactScene = res.getToaddscene();
        }
        if (stranger.indexOf(STRANGER_SUFFIX) === -1 || !ticket) {
            // the contact is already a friend
            log.warn(`contact: ${stranger} is already a friend, skip adding`);
        }
        else {
            let hello;
            let roomId;
            let cid;
            if (option) {
                if (typeof option === "string") {
                    hello = option;
                }
                else {
                    hello = option.hello;
                    roomId = option.roomId;
                    cid = option.contactId;
                }
            }
            await this._client.api.addContact(stranger, ticket, addContactScene, hello, roomId, cid);
        }
    }
    async friendshipSearchPhone(phone) {
        return this._friendshipSearch(phone);
    }
    async friendshipSearchWeixin(weixin) {
        return this._friendshipSearch(weixin);
    }
    async _friendshipSearch(id) {
        const cachedContactSearch = await this._cacheMgr.getContactSearch(id);
        if (cachedContactSearch) {
            return id;
        }
        const res = await this._client.api.searchContact(id);
        const searchId = `${SEARCH_CONTACT_PREFIX}${id}`;
        await this._cacheMgr.setContactSearch(searchId, res.toObject());
        return searchId;
    }
    async _findRoomIdForUserName(userName) {
        const ret = [];
        const roomIds = (await this._cacheMgr?.getRoomIds()) || [];
        for (const roomId of roomIds) {
            const roomMember = await this._cacheMgr?.getRoomMember(roomId);
            if (!roomMember) {
                continue;
            }
            const roomMemberIds = Object.keys(roomMember);
            if (roomMemberIds.indexOf(userName) !== -1) {
                ret.push(roomId);
            }
        }
        return ret;
    }
    /****************************************************************************
     * get message payload
     ***************************************************************************/
    async messageContact(_messageId) {
        throw new Error("not implement");
    }
    async messageFile(messageId) {
        const messagePayload = await this.messageRawPayload(messageId);
        const message = await this.messageRawPayloadParser(messagePayload);
        switch (message.type) {
            case PUPPET.types.Message.Image:
                return this._getMessageImageFileBox(messageId, messagePayload, PUPPET.types.Image.HD);
            case PUPPET.types.Message.Audio: {
                let audioData;
                if (messagePayload.binarypayload && messagePayload.binarypayload.length) {
                    // json marshalled binary into base64 string
                    if (typeof messagePayload.binarypayload === "string") {
                        audioData = Buffer.from(messagePayload.binarypayload, "base64");
                    }
                    else {
                        audioData = Buffer.from(messagePayload.binarypayload);
                    }
                }
                else {
                    audioData = await this._client.api.getMessageVoice(messageId, message.text, messagePayload.tousername);
                }
                // set mediaType `audio/silk` by default
                const audioFileBox = FileBox.fromBuffer(audioData, `message-${messageId}-audio.sil`);
                const options = {
                    attrNodeName: "$",
                    attributeNamePrefix: "",
                    ignoreAttributes: false,
                };
                const msgXmlObj = XMLParser.parse(messagePayload.content, options);
                const voiceLength = parseInt(msgXmlObj.msg.voicemsg.$.voicelength, 10);
                audioFileBox.metadata = {
                    voiceLength,
                };
                return audioFileBox;
            }
            case PUPPET.types.Message.Video: {
                const videoData = await this._client.api.getMessageVideo(message.text, messagePayload.tousername);
                // set mediaType `video/mp4` by default
                return FileBox.fromBuffer(videoData, `message-${messageId}-video.mp4`);
            }
            case PUPPET.types.Message.Attachment: {
                const appMsg = await parseAppmsgMessagePayload(messagePayload.content);
                const fileData = await this._client.api.getMessageAttach(message.text, messagePayload.tousername);
                // should set mediaType according to the appMsg.title (the attachment name)
                // https://github.com/jshttp/mime-db/blob/4498a3f104ba4080a703f5435b065f982dc3a1b7/src/apache-types.json
                return FileBox.fromBuffer(fileData, appMsg.title);
            }
            case PUPPET.types.Message.Emoticon: {
                const emotionPayload = await parseEmotionMessagePayload(messagePayload);
                const emoticonBox = FileBox.fromUrl(emotionPayload.cdnurl, { name: `message-${messageId}-emoticon.jpg` });
                emoticonBox.metadata = {
                    payload: emotionPayload,
                    type: "emoticon",
                };
                return emoticonBox;
            }
            case PUPPET.types.Message.MiniProgram: {
                const thumbData = await this._client.api.getMessageMiniProgramThumb(messagePayload.content, messagePayload.tousername);
                return FileBox.fromBuffer(thumbData, `message-${messageId}-miniprogram-thumb.jpg`);
            }
            case PUPPET.types.Message.Url: {
                const appPayload = await parseAppmsgMessagePayload(messagePayload.content);
                if (appPayload.thumburl) {
                    return FileBox.fromUrl(appPayload.thumburl);
                }
                else {
                    try {
                        const urlThumbData = await this._client.api.getMessageAttachThumb(messagePayload.content, messagePayload.tousername);
                        return FileBox.fromBuffer(urlThumbData, `message-${messageId}-url-thumb.jpg`);
                    }
                    catch (e) {
                        log.warn(`fail to get thumb for url message:${messageId}, payload: ${JSON.stringify(appPayload)}`);
                        // return trivial placeholder FilBox object
                        return FileBox.fromBuffer(Buffer.from(new ArrayBuffer(0)), `message-${messageId}-url-thumb.jpg`);
                    }
                }
            }
            default:
                throw new Error(`Can not get file for message: ${messageId}`);
        }
    }
    async messageImage(messageId, imageType) {
        const messagePayload = await this.messageRawPayload(messageId);
        return this._getMessageImageFileBox(messageId, messagePayload, imageType);
    }
    async messageMiniProgram(messageId) {
        const messagePayload = await this.messageRawPayload(messageId);
        const message = await this.messageRawPayloadParser(messagePayload);
        if (message.type !== PUPPET.types.Message.MiniProgram) {
            throw new Error("message is not mini program, can not get MiniProgramPayload");
        }
        return parseMiniProgramMessagePayload(messagePayload);
    }
    async messageUrl(messageId) {
        const rawPayload = await this.messageRawPayload(messageId);
        const payload = await this.messageRawPayloadParser(rawPayload);
        if (payload.type !== PUPPET.types.Message.Url) {
            throw new Error("Can not get url from non url payload");
        }
        // FIXME: thumb may not in appPayload.thumburl, but in appPayload.appAttachPayload
        const appPayload = await parseAppmsgMessagePayload(rawPayload.content);
        return {
            description: appPayload.des,
            thumbnailUrl: appPayload.thumburl,
            title: appPayload.title,
            url: appPayload.url,
        };
    }
    /****************************************************************************
     * send message
     ***************************************************************************/
    async messageSendContact(toUserName, contactId) {
        const contactPayload = await this.contactRawPayload(contactId);
        const contact = new PadLocal.Contact()
            .setUsername(contactPayload.username)
            .setNickname(contactPayload.nickname)
            .setAvatar(contactPayload.avatar)
            .setGender(contactPayload.gender)
            .setSignature(contactPayload.signature)
            .setAlias(contactPayload.alias)
            .setLabel(contactPayload.label)
            .setRemark(contactPayload.remark)
            .setCity(contactPayload.city)
            .setProvince(contactPayload.province)
            .setCountry(contactPayload.country)
            .setContactaddscene(contactPayload.contactaddscene)
            .setStranger(contactPayload.stranger);
        const response = await this._client.api.sendContactCardMessage(genIdempotentId(), toUserName, contact);
        const pushContent = (isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: ` : "") +
            "向你推荐了" +
            contact.getNickname();
        await this._onSendMessage(new PadLocal.Message()
            .setType(WechatMessageType.Text) // FIXME: difficult to construct a legal PadLocal.Contact message, use text instead.
            .setFromusername(this.currentUserId)
            .setTousername(toUserName)
            .setContent(pushContent)
            .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
        return response.getMsgid();
    }
    async messageSendFile(toUserName, fileBox) {
        const metadata = fileBox.metadata;
        if (metadata.type === "emoticon") {
            // emoticon
            // mediaType will be image/jpeg, so can't judge emoticon message with mediaType
            const emotionPayload = metadata.payload;
            const response = await this._client.api.sendMessageEmoji(genIdempotentId(), toUserName, emotionPayload.md5, emotionPayload.len, emotionPayload.type, emotionPayload.gameext);
            const pushContent = isRoomId(toUserName)
                ? `${this._client.selfContact.getNickname()}: [动画表情]`
                : "[动画表情]";
            const content = generateEmotionPayload(emotionPayload);
            await this._onSendMessage(new PadLocal.Message()
                .setType(WechatMessageType.Emoticon)
                .setFromusername(this.currentUserId)
                .setTousername(toUserName)
                .setContent(content)
                .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
            return response.getMsgid();
        }
        else if (fileBox.mediaType.startsWith("image/")) {
            // image/jpeg, image/png
            const imageData = await fileBox.toBuffer();
            const response = await this._client.api.sendImageMessage(genIdempotentId(), toUserName, imageData);
            const pushContent = isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: [图片]` : "[图片]";
            await this._onSendMessage(new PadLocal.Message()
                .setType(WechatMessageType.Text) // FIXME: difficult to construct a legal Image message, use text instead.
                .setFromusername(this.currentUserId)
                .setTousername(toUserName)
                .setContent(pushContent)
                .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
            return response.getMsgid();
        }
        else if (fileBox.mediaType === "audio/silk") {
            // audio/silk
            const audioData = await fileBox.toBuffer();
            const response = await this._client.api.sendVoiceMessage(genIdempotentId(), toUserName, audioData, fileBox.metadata["voiceLength"]);
            const pushContent = isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: [语音]` : "[语音]";
            await this._onSendMessage(new PadLocal.Message()
                .setType(WechatMessageType.Text) // FIXME: difficult to construct a legal Voice message, use text instead.
                .setFromusername(this.currentUserId)
                .setTousername(toUserName)
                .setContent(pushContent)
                .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
            return response.getMsgid();
        }
        else if (fileBox.mediaType.startsWith("video/")) {
            // video/mp4
            const videoData = await fileBox.toBuffer();
            const response = await this._client.api.sendVideoMessage(genIdempotentId(), toUserName, videoData);
            const pushContent = isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: [视频]` : "[视频]";
            await this._onSendMessage(new PadLocal.Message()
                .setType(WechatMessageType.Text) // FIXME: difficult to construct a legal Video message, use text instead.
                .setFromusername(this.currentUserId)
                .setTousername(toUserName)
                .setContent(pushContent)
                .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
            return response.getMsgid();
        }
        else {
            /**
             * try to send any other type as binary fileBox, such as:
             * - application/octet-stream
             * - application/pdf
             */
            const fileData = await fileBox.toBuffer();
            const response = await this._client.api.sendFileMessage(genIdempotentId(), toUserName, fileData, fileBox.name);
            const pushContent = isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: [文件]` : "[文件]";
            await this._onSendMessage(new PadLocal.Message()
                .setType(WechatMessageType.Text) // FIXME: difficult to construct a legal File message, use text instead.
                .setFromusername(this.currentUserId)
                .setTousername(toUserName)
                .setContent(pushContent)
                .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
            return response.getMsgid();
        }
    }
    async messageSendMiniProgram(toUserName, mpPayload) {
        const miniProgram = new PadLocal.AppMessageMiniProgram();
        mpPayload.appid && miniProgram.setMpappid(mpPayload.appid);
        mpPayload.title && miniProgram.setTitle(mpPayload.title);
        mpPayload.pagePath && miniProgram.setMpapppath(mpPayload.pagePath);
        mpPayload.iconUrl && miniProgram.setMpappiconurl(mpPayload.iconUrl);
        mpPayload.description && miniProgram.setDescription(mpPayload.description);
        mpPayload.description && miniProgram.setMpappname(mpPayload.description);
        mpPayload.username && miniProgram.setMpappusername(mpPayload.username);
        let thumbImageData = null;
        if (mpPayload.thumbUrl && mpPayload.thumbKey) {
            // 1. cdn url and key
            thumbImageData = await this._client.api.getEncryptedFile(PadLocal.EncryptedFileType.IMAGE_THUMB, mpPayload.thumbUrl, hexStringToBytes(mpPayload.thumbKey));
        }
        else if (mpPayload.thumbUrl) {
            // 2. http url
            const parsedUrl = new nodeUrl.URL(mpPayload.thumbUrl);
            if (parsedUrl.protocol.startsWith("http")) {
                // download the image data
                const imageBox = FileBox.fromUrl(mpPayload.thumbUrl);
                thumbImageData = await imageBox.toBuffer();
            }
        }
        if (!thumbImageData) {
            log.warn(PRE, "no thumb image found while sending mimi program");
        }
        const response = await this._client.api.sendMessageMiniProgram(genIdempotentId(), toUserName, miniProgram, thumbImageData);
        const pushContent = isRoomId(toUserName)
            ? `${this._client.selfContact.getNickname()}: [小程序] ${mpPayload.title}`
            : `[小程序] ${mpPayload.title}`;
        await this._onSendMessage(new PadLocal.Message()
            .setType(WechatMessageType.App)
            .setFromusername(this.currentUserId)
            .setTousername(toUserName)
            .setContent(response.getMsgcontent())
            .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
        return response.getMsgid();
    }
    async messageSendText(toUserName, text, mentionIdList) {
        const response = await this._client.api.sendTextMessage(genIdempotentId(), toUserName, text, mentionIdList);
        const messageRevokeInfo = response.getMessagerevokeinfo();
        // logger.info(`messageSendText: %o`, { toUserName, text, response, messageRevokeInfo });
        const pushContent = isRoomId(toUserName) ? `${this._client.selfContact.getNickname()}: ${text}` : text;
        await this._onSendMessage(new PadLocal.Message()
            .setType(WechatMessageType.Text)
            .setFromusername(this.currentUserId)
            .setTousername(toUserName)
            .setContent(text)
            .setPushcontent(pushContent), response.getMsgid(), messageRevokeInfo);
        return response.getMsgid();
    }
    async messageSendUrl(toUserName, linkPayload) {
        const appMessageLink = new PadLocal.AppMessageLink();
        appMessageLink.setTitle(linkPayload.title).setUrl(linkPayload.url);
        linkPayload.description && appMessageLink.setDescription(linkPayload.description);
        if (linkPayload.thumbnailUrl) {
            appMessageLink.setThumburl(linkPayload.thumbnailUrl);
        }
        const response = await this._client.api.sendMessageLink(genIdempotentId(), toUserName, appMessageLink);
        const pushContent = isRoomId(toUserName)
            ? `${this._client.selfContact.getNickname()}: [链接] ${linkPayload.title}`
            : `[链接] ${linkPayload.title}`;
        await this._onSendMessage(new PadLocal.Message()
            .setType(WechatMessageType.App)
            .setFromusername(this.currentUserId)
            .setTousername(toUserName)
            .setContent(response.getMsgcontent())
            .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
        return response.getMsgid();
    }
    async messageRecall(messageId) {
        logger.info(`recalling message(id=${messageId})`);
        const message = (await this._cacheMgr.getMessage(messageId));
        logger.info(`recalling message: %o`, message);
        const messageRevokeInfo = (await this._cacheMgr.getMessageRevokeInfo(messageId));
        logger.info(`recalling message revoke info: %o`, messageRevokeInfo);
        await this._client.api.revokeMessage(messageId, message.fromusername, message.tousername, new PadLocal.MessageRevokeInfo()
            .setClientmsgid(messageRevokeInfo.clientmsgid)
            .setNewclientmsgid(messageRevokeInfo.newclientmsgid)
            .setCreatetime(messageRevokeInfo.createtime));
        logger.info(`recalled`);
        return true;
    }
    async messageForward(toUserName, messageId) {
        const messagePayload = await this.messageRawPayload(messageId);
        const message = await this.messageRawPayloadParser(messagePayload);
        let newMessageId;
        switch (message.type) {
            case PUPPET.types.Message.Text:
                newMessageId = await this.messageSendText(toUserName, message.text);
                break;
            case PUPPET.types.Message.Image: {
                const imageFileBox = await this.messageImage(messageId, PUPPET.types.Image.HD);
                newMessageId = await this.messageSendFile(toUserName, imageFileBox);
                break;
            }
            case PUPPET.types.Message.Audio: {
                const audioFileBox = await this.messageFile(messageId);
                newMessageId = await this.messageSendFile(toUserName, audioFileBox);
                break;
            }
            case PUPPET.types.Message.Video: {
                const videoFileBox = await this.messageFile(messageId);
                newMessageId = await this.messageSendFile(toUserName, videoFileBox);
                break;
            }
            case PUPPET.types.Message.Attachment:
            case PUPPET.types.Message.MiniProgram:
            case PUPPET.types.Message.Url: {
                const response = await this._client.api.forwardMessage(genIdempotentId(), toUserName, messagePayload.content, messagePayload.type, messagePayload.tousername);
                newMessageId = response.getMsgid();
                let pushContent = messagePayload.pushcontent;
                if (pushContent && pushContent.indexOf(":") !== -1) {
                    pushContent = pushContent.split(":")[1];
                }
                if (isRoomId(toUserName)) {
                    pushContent = `${this._client.selfContact.getNickname()}:${pushContent}`;
                }
                await this._onSendMessage(new PadLocal.Message()
                    .setType(WechatMessageType.App)
                    .setFromusername(this.currentUserId)
                    .setTousername(toUserName)
                    .setContent(response.getMsgcontent())
                    .setPushcontent(pushContent), response.getMsgid(), response.getMessagerevokeinfo());
                break;
            }
            case PUPPET.types.Message.Emoticon: {
                const emotionBox = await this.messageFile(messageId);
                newMessageId = await this.messageSendFile(toUserName, emotionBox);
                break;
            }
            default:
                throw new Error(`Message forwarding is unsupported for messageId:${messageId}, type:${message.type}`);
        }
        return newMessageId;
    }
    /****************************************************************************
     * room
     ***************************************************************************/
    async roomAdd(roomId, contactId) {
        await this._client.api.addChatRoomMember(roomId, contactId);
    }
    async roomAvatar(roomId) {
        const chatroom = await this.roomRawPayload(roomId);
        if (chatroom.avatar) {
            return FileBox.fromUrl(chatroom.avatar);
        }
        else {
            // return dummy FileBox object
            return FileBox.fromBuffer(Buffer.from(new ArrayBuffer(0)), `room-${chatroom.username}-avatar.jpg`);
        }
    }
    async roomCreate(contactIdList, topic) {
        const res = await this._client.api.createChatRoom(genIdempotentId(), contactIdList);
        if (topic) {
            await this._client.api.setChatRoomName(res.getRoomid(), topic);
        }
        return res.getRoomid();
    }
    async roomDel(roomId, contactId) {
        await this._client.api.deleteChatRoomMember(roomId, contactId);
    }
    async roomList() {
        return this._cacheMgr.getRoomIds();
    }
    async roomQRCode(roomId) {
        const res = await this._client.api.getChatRoomQrCode(roomId);
        const fileBox = FileBox.fromBuffer(Buffer.from(res.getQrcode()), `qr-${this.currentUserId}.jpg`);
        return fileBox.toQRCode();
    }
    async roomQuit(roomId) {
        await this._client.api.quitChatRoom(roomId);
    }
    async roomTopic(roomId, topic) {
        await this._client.api.setChatRoomName(roomId, topic || "");
    }
    async roomAnnounce(roomId, text) {
        if (text === undefined) {
            return this._client.api.getChatRoomAnnouncement(roomId);
        }
        else {
            await this._client.api.setChatRoomAnnouncement(roomId, text);
        }
    }
    async roomMemberList(roomId) {
        const roomMemberMap = await this._getRoomMemberList(roomId);
        return Object.values(roomMemberMap).map((m) => m.username);
    }
    async roomInvitationAccept(roomInvitationId) {
        const roomInvitation = await this.roomInvitationRawPayload(roomInvitationId);
        await this._client.api.acceptChatRoomInvitation(roomInvitation.inviterId, roomInvitation.invitation);
    }
    /****************************************************************************
     * RawPayload section
     ***************************************************************************/
    async contactRawPayloadParser(payload) {
        return padLocalContactToWechaty(payload);
    }
    async contactRawPayload(id) {
        if (id.startsWith(SEARCH_CONTACT_PREFIX)) {
            const searchContact = await this._cacheMgr?.getContactSearch(id);
            return searchContact.contact;
        }
        let ret = await this._cacheMgr.getContact(id);
        if (!ret) {
            ret = await CachedPromiseFunc(`contactRawPayload-${id}`, async () => {
                const contact = await this._refreshContact(id);
                return contact.toObject();
            });
        }
        return ret;
    }
    async messageRawPayloadParser(payload) {
        return padLocalMessageToWechaty(this, payload);
    }
    async messageRawPayload(id) {
        const ret = await this._cacheMgr.getMessage(id);
        if (!ret) {
            throw new Error(`can not find message in cache for messageId: ${id}`);
        }
        return ret;
    }
    async roomRawPayloadParser(payload) {
        return padLocalRoomToWechaty(payload);
    }
    async roomRawPayload(id) {
        let ret = await this._cacheMgr.getRoom(id);
        if (!ret) {
            const contact = await this._refreshContact(id);
            ret = contact.toObject();
        }
        return ret;
    }
    async roomMemberRawPayload(roomId, contactId) {
        const roomMemberMap = await this._getRoomMemberList(roomId);
        return roomMemberMap[contactId];
    }
    async roomMemberRawPayloadParser(rawPayload) {
        return padLocalRoomMemberToWechaty(rawPayload);
    }
    async roomInvitationRawPayload(roomInvitationId) {
        const ret = await this._cacheMgr.getRoomInvitation(roomInvitationId);
        if (!ret) {
            throw new Error(`Can not find room invitation for id: ${roomInvitationId}`);
        }
        return ret;
    }
    async roomInvitationRawPayloadParser(rawPayload) {
        return rawPayload;
    }
    async friendshipRawPayload(id) {
        const ret = await this._cacheMgr.getFriendshipRawPayload(id);
        if (!ret) {
            throw new Error(`Can not find friendship for id: ${id}`);
        }
        return ret;
    }
    async friendshipRawPayloadParser(rawPayload) {
        return rawPayload;
    }
    /****************************************************************************
     * extra methods section
     ***************************************************************************/
    /**
     * CAUTION: For edge case usage only!
     * Sync contact is a time-consuming action, may last for minutes especially when you have massive contacts.
     * You MUST understand what exactly you are doing.
     */
    async syncContact() {
        if (this.state.active() !== true) {
            throw new Error("Can not sync contact before login");
        }
        await this.client.api.syncContact({
            onSync: (contactList) => {
                this.wrapAsync(this._onPushSerialExecutor.execute(async () => {
                    for (const contact of contactList) {
                        await this._onPushContact(contact);
                    }
                }));
            },
        });
    }
    /****************************************************************************
     * private section
     ***************************************************************************/
    async _findTagWithName(tagName, addIfNotExist) {
        let labelList = (await this._getTagList()).labelList;
        let ret = labelList.find((l) => l.getName() === tagName);
        if (!ret) {
            // try refresh label list if not find by name
            labelList = (await this._getTagList(true)).labelList;
            ret = labelList.find((l) => l.getName() === tagName);
        }
        // add new label
        if (!ret && addIfNotExist) {
            const newLabelId = await this._client.api.addLabel(tagName);
            ret = new PadLocal.Label().setId(newLabelId).setName(tagName);
            // refresh label list;
            await this._getTagList(true);
        }
        return ret || null;
    }
    async _getTagList(force) {
        let labelList = this._cacheMgr.getLabelList();
        let fromCache = true;
        if (!labelList || force) {
            labelList = await this._client.api.getLabelList();
            this._cacheMgr?.setLabelList(labelList);
            fromCache = false;
        }
        return {
            fromCache,
            labelList,
        };
    }
    async _getRoomMemberList(roomId, force) {
        // FIX: https://github.com/wechaty/puppet-padlocal/issues/115
        if (!this._cacheMgr) {
            return {};
        }
        let ret = await this._cacheMgr.getRoomMember(roomId);
        if (!ret || force) {
            const resMembers = await this._client.api.getChatRoomMembers(roomId);
            const roomMemberMap = {};
            for (const roomMember of resMembers) {
                const contact = chatRoomMemberToContact(roomMember);
                const hasContact = await this._cacheMgr.hasContact(contact.getUsername());
                // save chat room member as contact, to forbid massive this._client.api.getContact(id) requests while room.ready()
                if (!hasContact) {
                    await this._cacheMgr.setContact(contact.getUsername(), contact.toObject());
                }
                roomMemberMap[roomMember.getUsername()] = roomMember.toObject();
            }
            ret = roomMemberMap;
            await this._updateRoomMember(roomId, roomMemberMap);
        }
        return ret;
    }
    async _updateContactCache(contact) {
        if (!contact.username) {
            log.warn(PRE, `username is required for contact: ${JSON.stringify(contact)}`);
            return;
        }
        if (isRoomId(contact.username)) {
            const oldRoomPayload = await this._cacheMgr.getRoom(contact.username);
            if (oldRoomPayload) {
                // some contact push may not contain avatar, e.g. modify room announcement
                if (!contact.avatar) {
                    contact.avatar = oldRoomPayload.avatar;
                }
                // If case you are not the chatroom owner, room leave message will not be sent.
                // Calc the room member diffs, then send room leave event instead.
                if (contact.chatroommemberList.length < oldRoomPayload.chatroommemberList.length) {
                    const newMemberIdSet = new Set(contact.chatroommemberList.map((m) => m.username));
                    const removedMemberIdList = oldRoomPayload.chatroommemberList
                        .filter((m) => !newMemberIdSet.has(m.username))
                        .map((m) => m.username)
                        .filter((removeeId) => !isRoomLeaveDebouncing(contact.username, removeeId));
                    if (removedMemberIdList.length) {
                        removedMemberIdList.forEach((removeeId) => {
                            const roomLeave = {
                                removeeIdList: [removeeId],
                                removerId: removeeId,
                                roomId: contact.username,
                                timestamp: Math.floor(Date.now() / 1000),
                            };
                            this.emit("room-leave", roomLeave);
                        });
                    }
                }
            }
            const roomId = contact.username;
            await this._cacheMgr.setRoom(roomId, contact);
            await this.dirtyPayload(PUPPET.types.Payload.Room, roomId);
            await this._updateRoomMember(roomId);
        }
        else {
            await this._cacheMgr.setContact(contact.username, contact);
            await this.dirtyPayload(PUPPET.types.Payload.Contact, contact.username);
        }
    }
    async _updateRoomMember(roomId, roomMemberMap) {
        if (roomMemberMap) {
            await this._cacheMgr.setRoomMember(roomId, roomMemberMap);
        }
        else {
            await this._cacheMgr.deleteRoomMember(roomId);
        }
        await this.dirtyPayload(PUPPET.types.Payload.RoomMember, roomId);
    }
    async _onPushContact(contact) {
        log.silly(PRE, `on push contact: ${JSON.stringify(contact.toObject())}`);
        await this._updateContactCache(contact.toObject());
        if (contact.getEncryptusername()) {
            const aliasToSet = await this._cacheMgr.getContactStrangerAlias(contact.getEncryptusername());
            if (aliasToSet) {
                await this.contactAlias(contact.getUsername(), aliasToSet);
                await this._cacheMgr.deleteContactStrangerAlias(contact.getEncryptusername());
            }
        }
    }
    async _onPushMessage(message) {
        const messageId = message.getId();
        log.silly(PRE, `on push original message: ${JSON.stringify(message.toObject())}`);
        log.silly(PRE, Buffer.from(message.serializeBinary()).toString("hex"));
        // filter out duplicated messages
        if (await this._cacheMgr.hasMessage(messageId)) {
            return;
        }
        const messageObj = message.toObject();
        await this._cacheMgr.setMessage(message.getId(), messageObj);
        const event = await parseEvent(this, messageObj);
        switch (event.type) {
            case EventType.Message:
                this.emit("message", {
                    messageId,
                });
                break;
            case EventType.Friendship: {
                const friendship = event.payload;
                await this._cacheMgr.setFriendshipRawPayload(messageId, friendship);
                this.emit("friendship", {
                    friendshipId: messageId,
                });
                break;
            }
            case EventType.RoomInvite: {
                const roomInvite = event.payload;
                await this._cacheMgr.setRoomInvitation(messageId, roomInvite);
                this.emit("room-invite", {
                    roomInvitationId: messageId,
                });
                break;
            }
            case EventType.RoomJoin: {
                const roomJoin = event.payload;
                this.emit("room-join", roomJoin);
                await this._updateRoomMember(roomJoin.roomId);
                break;
            }
            case EventType.RoomLeave: {
                const roomLeave = event.payload;
                this.emit("room-leave", roomLeave);
                await this._updateRoomMember(roomLeave.roomId);
                break;
            }
            case EventType.RoomTopic: {
                const roomTopic = event.payload;
                this.emit("room-topic", roomTopic);
                break;
            }
        }
    }
    async _onSendMessage(partialMessage, messageId, messageRevokeInfo) {
        partialMessage.setId(messageId);
        partialMessage.setCreatetime(messageRevokeInfo.getCreatetime());
        await this._cacheMgr.setMessage(messageId, partialMessage.toObject());
        await this._cacheMgr.setMessageRevokeInfo(messageId, messageRevokeInfo.toObject());
        // To fix: https://github.com/wechaty/puppet-padlocal/issues/101
        // Call at next event loop, after send message func return hopefully
        setImmediate(() => {
            this.emit("message", {
                messageId,
            });
        });
    }
    async _setupClient() {
        this._client = await PadLocalClient.create(this.options.token, true);
        this._client.on("kickout", this.wrapAsync(async (_detail) => {
            if (this.currentUserId) {
                this.emit("logout", { contactId: this.currentUserId, data: _detail.errorMessage });
            }
            await this._stopClient(true);
        }));
        this._client.on("message", this.wrapAsync(async (messageList) => {
            await this._onPushSerialExecutor.execute(async () => {
                for (const message of messageList) {
                    // handle message one by one
                    await this._onPushMessage(message);
                }
            });
        }));
        this._client.on("contact", this.wrapAsync(async (contactList) => {
            await this._onPushSerialExecutor.execute(async () => {
                for (const contact of contactList) {
                    await this._onPushContact(contact);
                }
            });
        }));
        if (this._printVersion) {
            // only print once
            this._printVersion = false;
            log.info(`
      ============================================================
       Welcome to Wechaty PadLocal puppet!

       - puppet-padlocal version: ${VERSION}
       - padlocal-ts-client version: ${this._client.version}
      ============================================================
    `);
        }
    }
    async _refreshContact(userName, ticket) {
        const contact = await this._client.api.getContact(userName, ticket);
        // may return contact with empty payload, empty username, nickname, etc.
        if (!contact.getUsername()) {
            contact.setUsername(userName);
        }
        await this._updateContactCache(contact.toObject());
        return contact;
    }
    _startPuppetHeart(firstTime = true) {
        if (firstTime && this._heartBeatTimer) {
            return;
        }
        this.emit("heartbeat", { data: "heartbeat@padlocal" });
        this._heartBeatTimer = setTimeout(() => {
            this._startPuppetHeart(false);
        }, 15 * 1000); // 15s
    }
    _stopPuppetHeart() {
        if (!this._heartBeatTimer) {
            return;
        }
        clearTimeout(this._heartBeatTimer);
        this._heartBeatTimer = undefined;
    }
    async _getMessageImageFileBox(messageId, messagePayload, imageType) {
        const message = await this.messageRawPayloadParser(messagePayload);
        if (message.type !== PUPPET.types.Message.Image) {
            throw new Error(`message ${messageId} is not image type message`);
        }
        if (imageType === PUPPET.types.Image.Thumbnail) {
            if (messagePayload.binarypayload && messagePayload.binarypayload.length) {
                const imageData = Buffer.from(messagePayload.binarypayload);
                return FileBox.fromBuffer(imageData, `message-${messageId}-image-thumb.jpg`);
            }
        }
        let pbImageType;
        if (imageType === PUPPET.types.Image.Thumbnail) {
            pbImageType = PadLocal.ImageType.THUMB;
        }
        else if (imageType === PUPPET.types.Image.HD) {
            pbImageType = PadLocal.ImageType.NORMAL;
        }
        else {
            pbImageType = PadLocal.ImageType.HD;
        }
        const ret = await this._client.api.getMessageImage(messagePayload.content, messagePayload.tousername, pbImageType);
        let imageNameSuffix;
        if (ret.imageType === PadLocal.ImageType.THUMB) {
            imageNameSuffix = "thumb";
        }
        else if (ret.imageType === PadLocal.ImageType.HD) {
            imageNameSuffix = "hd";
        }
        else {
            imageNameSuffix = "normal";
        }
        return FileBox.fromBuffer(ret.imageData, `message-${messageId}-image-${imageNameSuffix}.jpg`);
    }
}
export { PuppetPadlocal, VERSION, AppMessageType };
export default PuppetPadlocal;
logger.info(`\n== PuppetPadlocal ==\n`);
