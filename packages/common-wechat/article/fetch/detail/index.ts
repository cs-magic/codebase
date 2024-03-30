import { fetchWechatArticleDetailViaMock } from "./providers/with-key"
import { fetchWechatArticleDetailViaWxapi } from "./providers/wxapi"
import { IFetchWechatArticleDetailConfig, IWechatArticleDetail } from "./schema"

export const fetchWechatArticleDetail = async (
  id: string,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<IWechatArticleDetail | null> => {
  if (!detailConfig) return null

  const { provider, get, set } = detailConfig

  let detail: IWechatArticleDetail | null = null
  if (get) {
    detail = await get(id)
    if (detail !== null) console.log("-- detail cached")
  }

  if (detail === null) {
    console.log("-- detail fetching")
    const fetchDetail =
      provider === "mock"
        ? fetchWechatArticleDetailViaMock
        : fetchWechatArticleDetailViaWxapi

    const data = await fetchDetail(id)
    if (data.success) {
      detail = data.data
      console.log("-- detailed fetched: ", detail)
      if (set) await set(id, detail)
    }
  }

  return detail
}
