import { IWechatPreference } from "schema/bot.preference"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (message: {
  convId: string
  isRoom: boolean
}): Promise<IWechatPreference> => {
  const row = await getConvRow(message)
  return getRobustPreference(row)
}
