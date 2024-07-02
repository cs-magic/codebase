import { deserializeRefMsgPayload } from "./deserialize-ref-msg";
/**
 * 从 消息 中解析出被引用的数据
 *
 * @param messageText
 * @param version
 */
export const deserializeMsg = (messageText, version = "mark@2024-04-19") => {
    const m = /^「(.*?)：(.*?)」\n- - - - - - - - - - - - - - -\n(.*)$/ms.exec(messageText);
    if (!m)
        return null;
    const deserialized = deserializeRefMsgPayload(m[2]);
    return {
        userName: m[1],
        content: m[3],
        quoted: version === "mark@2024-04-19" && typeof deserialized === "object"
            ? { version, ...deserialized }
            : {
                version,
                content: m[2],
            },
    };
};
