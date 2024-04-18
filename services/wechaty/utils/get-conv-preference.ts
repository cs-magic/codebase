import { IWechatUserPreference } from "../schema/wechat-user"
import { getConvRow } from "./get-conv-row"
import { getRobustPreference } from "./get-robust-preference"

export const getConvPreference = async (message: {
  convId: string
  isRoom: boolean
}): Promise<IWechatUserPreference> => {
  const row = await getConvRow(message)
  return getRobustPreference(row)
}
