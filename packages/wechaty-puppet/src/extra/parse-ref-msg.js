import { logger } from "@cs-magic/log/logger";
import { AppMessageType } from "./message";
import { serializeRefMsgPayload } from "./serialize-ref-msg";
import { types } from "../mods/mod";
export const referMsgParser = async (_localMessage, ret, context) => {
    const appMessagePayload = context.appMessagePayload;
    logger.info(`[refer] <-- ret`);
    // logger.info({ ret, localMessage, appMessagePayload })
    if (!appMessagePayload ||
        appMessagePayload.type !== AppMessageType.ReferMsg) {
        return ret;
    }
    const referMessagePayload = appMessagePayload.refermsg;
    // todo: use extra type of PUPPET.types.Message, mark@2024-04-19 10:21:24
    ret.type = types.Message.Text;
    // todo: possible undefined
    ret.text = !referMessagePayload
        ? appMessagePayload.title
        : `「${referMessagePayload.displayname}：${serializeRefMsgPayload(referMessagePayload)}」\n- - - - - - - - - - - - - - -\n${appMessagePayload.title}`;
    logger.debug(`[refer] --> ret: %o`, ret);
    return ret;
};
