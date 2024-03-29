"use server"

import { IApi } from "../../common-api/schema"
import { fetchWechatArticleDetailViaMock } from "./get-detail/providers/with-key"
import { fetchWechatArticleDetailViaWxapi } from "./get-detail/providers/wxapi"
import { IWechatArticleDetail } from "./get-detail/schema"

export const fetchWechatArticleDetail = async (
  url: string,
  type: "mock" | "wxapi" = "wxapi",
): Promise<IApi<IWechatArticleDetail>> => {
  switch (type) {
    case "mock":
      return await fetchWechatArticleDetailViaMock(url)

    case "wxapi":
      return await fetchWechatArticleDetailViaWxapi(url)
  }
}
