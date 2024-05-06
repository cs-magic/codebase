import { IWechatData, IWechatPreference } from "../schema/bot.preference"
import { getConvRow } from "./get-conv-row"
import { getRobustData, getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (message: {
  convId: string
}): Promise<IWechatPreference> => {
  const row = await getConvRow(message)
  return getRobustPreference(row)
}

export const getConvData = async (message: {
  convId: string
}): Promise<IWechatData> => {
  const row = await getConvRow(message)
  return getRobustData(row)
}
