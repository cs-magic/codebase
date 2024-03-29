"use server"

import { IApi } from "../../../common-api/schema"
import { fetchWechatArticleDetailViaMock } from "./detail/providers/with-key"
import { fetchWechatArticleDetailViaWxapi } from "./detail/providers/wxapi"
import { IWechatArticleDetail } from "./detail/schema"

export type IWechatArticle = {
  url: string | null
  content: string | null
  detail: IWechatArticleDetail | null
}

export const fetchWechatArticle = async (
  url: string,
  detail?: {
    provider: "mock" | "wxapi"
    // db hook
    get?: (url: string) => Promise<IApi<IWechatArticleDetail>>
    set?: (url: string, data: IWechatArticleDetail) => Promise<void>
  },
): Promise<IWechatArticle> => {
  const fetchDetail = async (): Promise<IApi<IWechatArticleDetail>> => {
    if (!detail) return { success: false, message: "no detail provider" }

    const { provider, get, set } = detail

    if (get) return get(url)

    const fetchDetail =
      provider === "mock"
        ? fetchWechatArticleDetailViaMock
        : fetchWechatArticleDetailViaWxapi

    const data = await fetchDetail(url)
    if (data.success && set) await set(url, data.data)
    return data
  }

  return {
    url,
    content: null,
    detail: (await fetchDetail()).data ?? null,
  }
}
