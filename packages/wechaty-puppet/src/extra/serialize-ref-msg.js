import { logger } from "@cs-magic/log/logger";
import { AppMessageType } from "./message";
export const serializeRefMsgPayload = (payload) => {
    logger.debug("-- serializeRefMsgPayload: %o", payload);
    return `RefMsg(id=${payload.svrid}, type=${AppMessageType[Number(payload.type)]}, content=${payload.content})`;
};
