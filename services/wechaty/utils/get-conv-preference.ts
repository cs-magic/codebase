import { type Message } from "wechaty"
import { IWechatUserPreference } from "../schema/wechat-user"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (
  message: Message,
): Promise<IWechatUserPreference> => {
  const conv = await getConvRow(message)
  return getRobustPreference(conv)
}
