export type IWechatError = {
  errcode: number
  errmsg: string
} // e.g. {"errcode":40029,"errmsg":"invalid code"}
export type IWechatRes<T extends object> = T | IWechatError
export const isWechatError = <T extends object>(
  res: IWechatRes<T>,
): res is IWechatError => "errcode" in res

export type IWechatSDKToken = { access_token: string; expires_in: number }
