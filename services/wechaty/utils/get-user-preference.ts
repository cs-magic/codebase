import { Message } from "wechaty"
import { IWechatUserPreference } from "../schema/wechat-user"
import { getRobustPreference } from "./get-robust-preference"
import { getUserRow } from "./get-user-row"

export const getUserPreference = async (
  message: Message,
): Promise<IWechatUserPreference> => {
  const row = await getUserRow(message)
  return getRobustPreference(row)
}
