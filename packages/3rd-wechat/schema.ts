import { IUserBasic } from "@/schema/user.summary"

import { ICallLLMResponse } from "../common-llm/schema/llm"
import { $Enums } from ".prisma/client"

export type IWechatError = {
  errcode: number
  errmsg: string
} // e.g. {"errcode":40029,"errmsg":"invalid code"}

export type IWechatRes<T extends object> = T | IWechatError
export const isWechatError = <T extends object>(
  res: IWechatRes<T>,
): res is IWechatError => "errcode" in res

export type IWechatSDKToken = { access_token: string; expires_in: number }

export type IFetchWxmpArticleRes = {
  sourceUrl: string
  platformId: string
  platformType: $Enums.PlatformType
  author: IUserBasic
  time: Date
  title: string
  cover: {
    url: string
    width: null
    height: null
  }
  description: string
  contentMd?: string
  contentSummary: ICallLLMResponse | null
}
