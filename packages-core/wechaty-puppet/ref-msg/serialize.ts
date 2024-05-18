// @ts-ignore
import { AppMessageType, ReferMsgPayload } from "wechaty-puppet-padlocal"

export const serializeRefMsgPayload = (payload: ReferMsgPayload) => {
  // console.log("-- refMsgPayload: ", payload);
  return `RefMsg(id=${payload.svrid}, type=${AppMessageType[Number(payload.type)]}, content=${payload.content})`
}
