import * as PUPPET from "wechaty-puppet";
import { WechatMessageType } from "../../types.js";
import { log } from "wechaty-puppet";
import { LOGPRE } from "./message-parser.js";
const TypeMappings = {
    [WechatMessageType.Text]: PUPPET.types.Message.Text,
    [WechatMessageType.Image]: PUPPET.types.Message.Image,
    [WechatMessageType.Voice]: PUPPET.types.Message.Audio,
    [WechatMessageType.Emoticon]: PUPPET.types.Message.Emoticon,
    [WechatMessageType.App]: PUPPET.types.Message.Attachment,
    [WechatMessageType.File]: PUPPET.types.Message.Attachment,
    [WechatMessageType.Location]: PUPPET.types.Message.Location,
    [WechatMessageType.Video]: PUPPET.types.Message.Video,
    [WechatMessageType.Sys]: PUPPET.types.Message.Unknown,
    [WechatMessageType.ShareCard]: PUPPET.types.Message.Contact,
    [WechatMessageType.VoipMsg]: PUPPET.types.Message.Recalled,
    [WechatMessageType.SysTemplate]: PUPPET.types.Message.Recalled,
    [WechatMessageType.StatusNotify]: PUPPET.types.Message.Unknown,
    [WechatMessageType.SysNotice]: PUPPET.types.Message.Unknown,
};
// @ts-ignore
export const typeParser = async (padLocalMessage, ret, _context) => {
    const wechatMessageType = padLocalMessage.type;
    let type = TypeMappings[wechatMessageType];
    if (!type) {
        log.verbose(LOGPRE, `unsupported type: ${JSON.stringify(padLocalMessage)}`);
        type = PUPPET.types.Message.Unknown;
    }
    ret.type = type;
    return ret;
};
