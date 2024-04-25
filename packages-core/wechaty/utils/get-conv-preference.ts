import { IWechatPreference } from "@cs-magic/prisma/schema/wechat-user"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (message: {
  convId: string
  isRoom: boolean
}): Promise<IWechatPreference> => {
  const row = await getConvRow(message)
  return getRobustPreference(row)
}
