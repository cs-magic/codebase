import { parseJsonSafe } from "@cs-magic/common/utils/parse-json";
import merge from "lodash/merge";
import omit from "lodash/omit";
import { defaultWechatData, defaultWechatPreference, } from "../schema/bot.preference";
export const getRobustPreference = (row) => {
    // migrate
    const rawPreference = omit(parseJsonSafe(row?.preference), [
        "chatterEnabled",
        "parserEnabled",
        "model",
        "lang",
        "backend",
        "features.image",
    ]);
    // todo: merge 的最佳实践 【限制default schema】
    const preference = merge({ ...defaultWechatPreference }, rawPreference);
    // logger.debug(JSON.stringify({ rawPreference, preference }, null, 2))
    return preference;
};
export const getRobustData = (row) => {
    return merge({ ...defaultWechatData }, parseJsonSafe(row?.data));
};
