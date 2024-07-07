import { referMsgParser } from "wechaty-puppet";
import { addMessageParser, executeMessageParsers } from "./message-parser.js";
import { typeParser } from "./message-parser-type.js";
import { roomParser } from "./message-parser-room.js";
import { singleChatParser } from "./message-parser-single-chat.js";
import { appMsgParser } from "./message-parser-appmsg.js";
import { sysmsgParser } from "./message-parser-sysmsg.js";

// The order of message parser is important
addMessageParser(typeParser);
addMessageParser(roomParser);
addMessageParser(singleChatParser);
addMessageParser(appMsgParser);
// @ts-ignore
addMessageParser(referMsgParser);
addMessageParser(sysmsgParser);

export { executeMessageParsers };
