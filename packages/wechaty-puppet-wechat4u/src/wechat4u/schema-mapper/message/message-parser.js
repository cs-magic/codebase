const messageParserList = [];
export function addMessageParser(parser) {
    messageParserList.push(parser);
}
export async function executeMessageParsers(puppet, webMessageRawPayload, ret) {
    const context = {
        isRoomMessage: false,
        puppet,
    };
    let i = 0;
    for (const parser of messageParserList) {
        // @ts-ignore
        ++i;
        // logger.info(`parser[${i}/${messageParserList.length}]`)
        ret = await parser(webMessageRawPayload, ret, context);
    }
    return ret;
}
export const LOGPRE = "message-parser";
