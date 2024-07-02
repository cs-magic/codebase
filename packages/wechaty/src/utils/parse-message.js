import { deserializeMsg } from "../../wechaty-puppet/src/extra/deserialize-msg";
import { puppetVersion } from "../../wechaty-puppet/src/extra/version";
export const parseText = (messageText) => {
    const text = (deserializeMsg(messageText, puppetVersion)?.content ?? messageText).trim();
    // logger.debug("parseText: %o", { text, messageText })
    return text;
};
