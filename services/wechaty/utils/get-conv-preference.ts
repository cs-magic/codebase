import { type IWechatUserPreference } from "@cs-magic/p01-card/src/schema/wechat-user"
import { type Message } from "wechaty"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (
  message: Message,
): Promise<IWechatUserPreference> => {
  const conv = await getConvRow(message)
  return getRobustPreference(conv)
}
