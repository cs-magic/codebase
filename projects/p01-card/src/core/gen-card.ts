import {
  fetchBilibiliDetail,
  fetchBvidFromb23tv,
} from "../../../3rd-bilibili/actions"
import { getBvidFromUrl } from "../../../3rd-bilibili/utils"
import { fetchWxmpArticleWithCache } from "../../../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { fetchXiaoHongShuDetail } from "../../../3rd-xhs/actions"
import { extractFirstURL } from "../../../common-common/parse-url"
import { ICardGenOptions } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { bilibili2card } from "./card-platform/bilibili/to-card"
import { isWxmpArticleUrl } from "./card-platform/wechat-article/utils"
import { xiaohongshu2card } from "./card-platform/xiaohongshu/to-card"

/**
 * 从用户输入的 url 中返回解析出的结构
 * @param inputUrlLike
 * @param options
 */
export const genCardFromUrl = async (
  inputUrlLike: string,
  options?: ICardGenOptions,
): Promise<ICardDetail> => {
  const urlParsed = extractFirstURL(inputUrlLike)
  console.log("-- genCardFromUrl: ", { inputUrlLike, urlParsed })
  if (!urlParsed)
    throw new Error(`invalid url to be parsed from ${inputUrlLike}`)

  if (isWxmpArticleUrl(urlParsed))
    return await fetchWxmpArticleWithCache(urlParsed, options)

  if (/xhslink|xiaohongshu/.test(urlParsed)) {
    const data = await fetchXiaoHongShuDetail(urlParsed)
    if (!data)
      throw new Error(
        `failed to fetch xiaohongshu detail from url ${urlParsed}, please try again`,
      )

    return xiaohongshu2card(data)
  }

  if (/bilibili|b23.tv/.test(urlParsed)) {
    let bvid: string | null
    if (/bilibili/.test(urlParsed)) bvid = getBvidFromUrl(urlParsed)
    else bvid = (await fetchBvidFromb23tv(urlParsed)).data ?? null

    if (!bvid)
      throw new Error(`invalid bilibili url to be parsed from ${urlParsed}`)

    const resDetail = await fetchBilibiliDetail(bvid)
    if (!resDetail.success) throw new Error(resDetail.message)

    return bilibili2card(resDetail.data)
  }

  throw new Error("couldn't decide which platform is")
}
