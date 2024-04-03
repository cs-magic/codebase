import { Card } from "@prisma/client"
import {
  fetchBilibiliDetail,
  fetchBvidFromb23tv,
} from "../../packages/common-platform-bilibili/actions"
import { getBvidFromUrl } from "../../packages/common-platform-bilibili/utils"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { fetchXiaoHongShuDetail } from "../../packages/common-platform-xiaohongshu/actions"
import { ICardGenOptions } from "../schema/card"
import { bilibili2card } from "./card-platform/bilibili/to-card"
import { fetchWechatArticleAction } from "./card-platform/wechat-article/fetch-with-cache.action"
import { isWechatArticleUrl } from "./card-platform/wechat-article/utils"
import { xiaohongshu2card } from "./card-platform/xiaohongshu/to-card"

/**
 * 从用户输入的 url 中返回解析出的结构
 * @param inputUrlLike
 * @param options
 */
export const genCardFromUrl = async (
  inputUrlLike: string,
  options: ICardGenOptions,
): Promise<Card> => {
  const urlParsed = extractFirstURL(inputUrlLike)
  console.log({ urlParsed })
  if (!urlParsed)
    throw new Error(`invalid url to be parsed from ${inputUrlLike}`)

  if (isWechatArticleUrl(urlParsed))
    return await fetchWechatArticleAction(urlParsed, options)

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
