import { IWechatPreference } from "schema/bot.preference"
import { Message } from "wechaty"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (message: {
  convId: string
  isRoom: boolean
}): Promise<IWechatPreference> => {
  const row = await getConvRow(message)
  return getRobustPreference(row)
}

export const getConvPreferenceFromMessage = async (
  message: Message,
): Promise<IWechatPreference> => {
  const row = await getConvRow({
    convId: message.conversation().id,
    isRoom: !!message.room(),
  })
  return getRobustPreference(row)
}
