import * as PUPPET from "wechaty-puppet";
import { FileBoxInterface } from "file-box";
import { PadLocalClient, Log as PadLocalLog } from "padlocal-client-ts";
import PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import { AppMessageType, type ReferMsgPayload } from "../../wechaty-puppet/src/extra/message";
import type { MessageParserContext } from "../../wechaty-puppet/src/extra/message.parser";
import type { MessageParser } from "./padlocal/schema-mapper/message/message-parser.js";
declare const VERSION: string;
export type PuppetPadlocalOptions = PUPPET.PuppetOptions & {
    serverCAFilePath?: string;
    defaultLoginPolicy?: PadLocal.LoginPolicy;
    restartOnFailure?: boolean;
};
declare class PuppetPadlocal extends PUPPET.Puppet {
    options: PuppetPadlocalOptions;
    static log: typeof PadLocalLog;
    private _client?;
    private _cacheMgr?;
    private _onPushSerialExecutor;
    private _printVersion;
    private _restartStrategy;
    private _heartBeatTimer?;
    constructor(options?: PuppetPadlocalOptions);
    get client(): PadLocalClient | undefined;
    onStart(): Promise<void>;
    private _startClient;
    /**
     * called internally while login success
     * @param userId
     * @protected
     */
    login(userId: string): Promise<void>;
    /**
     * stop the bot, with account signed on, will try auto login next time bot start.
     */
    onStop(): Promise<void>;
    private _stopClient;
    /**
     * logout account and stop the bot
     */
    logout(): Promise<void>;
    ding(_data?: string): void;
    /****************************************************************************
     * contact
     ***************************************************************************/
    contactSelfName(name: string): Promise<void>;
    contactSelfQRCode(): Promise<string>;
    contactSelfSignature(signature: string): Promise<void>;
    contactAlias(contactId: string): Promise<string>;
    contactAlias(contactId: string, alias: string | null): Promise<void>;
    contactAvatar(contactId: string): Promise<FileBoxInterface>;
    contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>;
    contactList(): Promise<string[]>;
    contactCorporationRemark(contactId: string, corporationRemark: string | null): Promise<void>;
    contactDescription(contactId: string, description: string | null): Promise<void>;
    contactPhone(contactId: string, phoneList: string[]): Promise<void>;
    contactDelete(contactId: string): Promise<void>;
    /****************************************************************************
     * tag
     ***************************************************************************/
    tagContactAdd(tagName: string, contactId: string): Promise<void>;
    tagContactRemove(tagName: string, contactId: string): Promise<void>;
    tagContactDelete(tagName: string): Promise<void>;
    tagContactList(contactId?: string): Promise<string[]>;
    /****************************************************************************
     * friendship
     ***************************************************************************/
    friendshipAccept(friendshipId: string): Promise<void>;
    friendshipAdd(contactId: string, option?: PUPPET.types.FriendshipAddOptions): Promise<void>;
    friendshipSearchPhone(phone: string): Promise<null | string>;
    friendshipSearchWeixin(weixin: string): Promise<null | string>;
    private _friendshipSearch;
    private _findRoomIdForUserName;
    /****************************************************************************
     * get message payload
     ***************************************************************************/
    messageContact(_messageId: string): Promise<string>;
    messageFile(messageId: string): Promise<FileBoxInterface>;
    messageImage(messageId: string, imageType: PUPPET.types.Image): Promise<FileBoxInterface>;
    messageMiniProgram(messageId: string): Promise<PUPPET.payloads.MiniProgram>;
    messageUrl(messageId: string): Promise<PUPPET.payloads.UrlLink>;
    /****************************************************************************
     * send message
     ***************************************************************************/
    messageSendContact(toUserName: string, contactId: string): Promise<string>;
    messageSendFile(toUserName: string, fileBox: FileBoxInterface): Promise<string>;
    messageSendMiniProgram(toUserName: string, mpPayload: PUPPET.payloads.MiniProgram): Promise<string>;
    messageSendText(toUserName: string, text: string, mentionIdList?: string[]): Promise<string>;
    messageSendUrl(toUserName: string, linkPayload: PUPPET.payloads.UrlLink): Promise<string>;
    messageRecall(messageId: string): Promise<boolean>;
    messageForward(toUserName: string, messageId: string): Promise<string>;
    /****************************************************************************
     * room
     ***************************************************************************/
    roomAdd(roomId: string, contactId: string): Promise<void>;
    roomAvatar(roomId: string): Promise<FileBoxInterface>;
    roomCreate(contactIdList: string[], topic?: string): Promise<string>;
    roomDel(roomId: string, contactId: string): Promise<void>;
    roomList(): Promise<string[]>;
    roomQRCode(roomId: string): Promise<string>;
    roomQuit(roomId: string): Promise<void>;
    roomTopic(roomId: string): Promise<string>;
    roomTopic(roomId: string, topic: string): Promise<void>;
    roomAnnounce(roomId: string): Promise<string>;
    roomAnnounce(roomId: string, text: string): Promise<void>;
    roomMemberList(roomId: string): Promise<string[]>;
    roomInvitationAccept(roomInvitationId: string): Promise<void>;
    /****************************************************************************
     * RawPayload section
     ***************************************************************************/
    contactRawPayloadParser(payload: PadLocal.Contact.AsObject): Promise<PUPPET.payloads.Contact>;
    contactRawPayload(id: string): Promise<PadLocal.Contact.AsObject>;
    messageRawPayloadParser(payload: PadLocal.Message.AsObject): Promise<PUPPET.payloads.Message>;
    messageRawPayload(id: string): Promise<PadLocal.Message.AsObject>;
    roomRawPayloadParser(payload: PadLocal.Contact.AsObject): Promise<PUPPET.payloads.Room>;
    roomRawPayload(id: string): Promise<PadLocal.Contact.AsObject>;
    roomMemberRawPayload(roomId: string, contactId: string): Promise<PadLocal.ChatRoomMember.AsObject>;
    roomMemberRawPayloadParser(rawPayload: PadLocal.ChatRoomMember.AsObject): Promise<PUPPET.payloads.RoomMember>;
    roomInvitationRawPayload(roomInvitationId: string): Promise<PUPPET.payloads.RoomInvitation>;
    roomInvitationRawPayloadParser(rawPayload: PUPPET.payloads.RoomInvitation): Promise<PUPPET.payloads.RoomInvitation>;
    friendshipRawPayload(id: string): Promise<PUPPET.payloads.Friendship>;
    friendshipRawPayloadParser(rawPayload: PUPPET.payloads.Friendship): Promise<PUPPET.payloads.Friendship>;
    /****************************************************************************
     * extra methods section
     ***************************************************************************/
    /**
     * CAUTION: For edge case usage only!
     * Sync contact is a time-consuming action, may last for minutes especially when you have massive contacts.
     * You MUST understand what exactly you are doing.
     */
    syncContact(): Promise<void>;
    /****************************************************************************
     * private section
     ***************************************************************************/
    private _findTagWithName;
    private _getTagList;
    private _getRoomMemberList;
    private _updateContactCache;
    private _updateRoomMember;
    private _onPushContact;
    private _onPushMessage;
    private _onSendMessage;
    private _setupClient;
    private _refreshContact;
    private _startPuppetHeart;
    private _stopPuppetHeart;
    private _getMessageImageFileBox;
}
export { PuppetPadlocal, VERSION, AppMessageType, MessageParser, MessageParserContext };
export type { ReferMsgPayload };
export default PuppetPadlocal;
