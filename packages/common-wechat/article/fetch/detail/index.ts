import { IApi } from "../../../../common-api/schema"
import { fetchWechatArticleDetailViaMock } from "./providers/with-key"
import { fetchWechatArticleDetailViaWxapi } from "./providers/wxapi"
import { IFetchWechatArticleDetailConfig, IWechatArticleDetail } from "./schema"

export const fetchDetail = async (
  url: string,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<IApi<IWechatArticleDetail>> => {
  if (!detailConfig) return { success: false, message: "no detail provider" }

  const { provider, get, set } = detailConfig

  if (get) return get(url)

  const fetchDetail =
    provider === "mock"
      ? fetchWechatArticleDetailViaMock
      : fetchWechatArticleDetailViaWxapi

  const data = await fetchDetail(url)
  if (data.success && set) await set(url, data.data)
  return data
}
