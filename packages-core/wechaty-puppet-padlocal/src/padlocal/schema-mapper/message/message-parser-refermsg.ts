import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import * as PUPPET from "wechaty-puppet";
import { AppMessageType, serializeRefMsgPayload, ReferMsgPayload } from "../../messages/message-appmsg.js";
import type { MessageParser, MessageParserContext } from "./message-parser.js";

export const referMsgParser: MessageParser = async (
  _padLocalMessage: PadLocal.Message.AsObject,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext
) => {
  if (!context.appMessagePayload || context.appMessagePayload.type !== AppMessageType.ReferMsg) {
    return ret;
  }

  const appPayload = context.appMessagePayload;

  const referMessagePayload: ReferMsgPayload = appPayload.refermsg!;

  ret.type = PUPPET.types.Message.Text;
  // console.log("-- quoted: ", formatRefMsgPayload(referMessagePayload));
  // todo: use extra type of PUPPET.types.Message, mark@2024-04-19 10:21:24
  ret.text = `「${referMessagePayload.displayname}：${serializeRefMsgPayload(
    referMessagePayload
  )}」\n- - - - - - - - - - - - - - -\n${appPayload.title}`;

  return ret;
};
