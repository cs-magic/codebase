import { Message } from "wechaty"
import { IWechatData, IWechatPreference } from "../schema/bot.preference"
import { getConvRow } from "./get-conv-row"
import { getRobustData, getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (
  message: Message,
): Promise<IWechatPreference> => {
  const row = await getConvRow({
    convId: message.conversation().id,
    isRoom: !!message.room(),
  })
  return getRobustPreference(row)
}

export const getConvData = async (message: Message): Promise<IWechatData> => {
  const row = await getConvRow({
    convId: message.conversation().id,
    isRoom: !!message.room(),
  })
  return getRobustData(row)
}
