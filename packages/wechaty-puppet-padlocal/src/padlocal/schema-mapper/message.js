import * as PUPPET from "wechaty-puppet";
import { executeMessageParsers } from "./message/mod.js";
export async function padLocalMessageToWechaty(puppet, padLocalMessage) {
    // set default value for MessagePayloadBase, other fields will be fulfilled or updated var MessageParers
    const ret = {
        id: padLocalMessage.id,
        talkerId: padLocalMessage.fromusername,
        text: padLocalMessage.content,
        timestamp: padLocalMessage.createtime,
        type: PUPPET.types.Message.Unknown,
    };
    await executeMessageParsers(puppet, padLocalMessage, ret);
    // validate the return value
    if (!(ret.roomId || ret.listenerId)) {
        throw new Error("neither roomId nor listenerId");
    }
    return ret;
}
