const messageParserList = [];
export function addMessageParser(parser) {
    messageParserList.push(parser);
}
export async function executeMessageParsers(puppet, padLocalMessage, ret) {
    const context = {
        isRoomMessage: false,
        puppet,
    };
    for (const parser of messageParserList) {
        ret = await parser(padLocalMessage, ret, context);
    }
    return ret;
}
export const LOGPRE = "message-parser";
