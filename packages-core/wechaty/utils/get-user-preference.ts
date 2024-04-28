import { Message } from "wechaty"
import { IWechatPreference } from "../schema/bot.preference"
import { getRobustPreference } from "./get-robust-preference"
import { getUserRow } from "./get-user-row"

export const getUserPreference = async (
  message: Message,
): Promise<IWechatPreference> => {
  const row = await getUserRow(message)
  return getRobustPreference(row)
}
