import { parseJs } from "./parse-js";
export const parseJsonSafe = (s) => {
    // logger.debug("parseJsonSafe: %o", s)
    if (!s)
        return null;
    if (typeof s === "object")
        return s;
    try {
        if (typeof s === "string" && s.startsWith('"'))
            return parseJsonSafe(JSON.parse(s));
        return parseJsonSafe(parseJs(s));
    }
    catch (e) {
        return null;
    }
};
export const safeParseJson = parseJsonSafe;
