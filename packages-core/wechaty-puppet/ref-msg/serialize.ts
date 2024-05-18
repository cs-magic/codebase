import { AppMessageType, ReferMsgPayload } from "../types/message"

export const serializeRefMsgPayload = (payload: ReferMsgPayload) => {
  // console.log("-- refMsgPayload: ", payload);
  return `RefMsg(id=${payload.svrid}, type=${AppMessageType[Number(payload.type)]}, content=${payload.content})`
}
