import { getConvData } from "./get-conv-preference";
/**
 * 展示用户信息，与它的调用量
 *
 * @param message
 * @param type
 */
export const formatTalkerFromMessage = async (message, type) => {
    let s = message.talker().name();
    const roomTopic = await message.room()?.topic();
    if (roomTopic) {
        s += `@${roomTopic}`;
        if (type) {
            const data = await getConvData({ convId: message.conversation().id });
            s += `(${data.plugin[type].success}/${data.plugin[type].called})`;
        }
    }
    return s;
};
