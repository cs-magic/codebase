import { AppMessageType } from "../../../../wechaty-puppet/src/extra/message";
import { parseAppmsgMessagePayload } from "../messages/message-appmsg.js";
const ROOM_OTHER_INVITE_TITLE_ZH = [/邀请你加入群聊/];
const ROOM_OTHER_INVITE_TITLE_EN = [/Group Chat Invitation/];
const ROOM_OTHER_INVITE_LIST_ZH = [/^"(.+)"邀请你加入群聊(.*)，进入可查看详情。/];
const ROOM_OTHER_INVITE_LIST_EN = [/"(.+)" invited you to join the group chat "(.+)"\. Enter to view details\./];
export default async (_puppet, message) => {
    let appMsgPayload;
    try {
        appMsgPayload = await parseAppmsgMessagePayload(message.content);
    }
    catch (e) {
        return null;
    }
    if (appMsgPayload.type !== AppMessageType.Url) {
        return null;
    }
    if (!appMsgPayload.title || !appMsgPayload.des) {
        return null;
    }
    let matchesForOtherInviteTitleEn = null;
    let matchesForOtherInviteTitleZh = null;
    let matchesForOtherInviteEn = null;
    let matchesForOtherInviteZh = null;
    ROOM_OTHER_INVITE_TITLE_EN.some((regex) => !!(matchesForOtherInviteTitleEn = appMsgPayload.title.match(regex)));
    ROOM_OTHER_INVITE_TITLE_ZH.some((regex) => !!(matchesForOtherInviteTitleZh = appMsgPayload.title.match(regex)));
    ROOM_OTHER_INVITE_LIST_EN.some((regex) => !!(matchesForOtherInviteEn = appMsgPayload.des.match(regex)));
    ROOM_OTHER_INVITE_LIST_ZH.some((regex) => !!(matchesForOtherInviteZh = appMsgPayload.des.match(regex)));
    const titleMatch = matchesForOtherInviteTitleEn || matchesForOtherInviteTitleZh;
    const matchInviteEvent = matchesForOtherInviteEn || matchesForOtherInviteZh;
    const matches = !!titleMatch && !!matchInviteEvent;
    if (!matches) {
        return null;
    }
    return {
        avatar: appMsgPayload.thumburl,
        id: message.id,
        invitation: appMsgPayload.url,
        inviterId: message.fromusername,
        memberCount: 0,
        memberIdList: [],
        receiverId: message.tousername,
        timestamp: message.createtime,
        topic: matchInviteEvent[2],
    };
};
