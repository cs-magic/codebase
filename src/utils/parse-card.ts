"use server"
import { IApi } from "../../packages/common-api/schema"
import {
  fetchBilibiliDetail,
  fetchBvidFromb23tv,
} from "../../packages/common-bilibili/actions"
import { getBvidFromUrl } from "../../packages/common-bilibili/utils"
import { prisma } from "../../packages/common-db/providers/prisma"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { fetchWechatArticle } from "../../packages/common-wechat/article/fetch"
import { fetchXiaoHongShuDetail } from "../../packages/common-xiaohongshu/actions"
import { ICardBody } from "../schema/card"
import { wechatArticleDetailSchema } from "../schema/wechat-article.detail"
import { bilibili2card } from "./provider-to-card/bilibili"
import { wechatArticle2card } from "./provider-to-card/wechat-article"
import { xiaohongshu2card } from "./provider-to-card/xiaohongshu"

/**
 * 从用户输入的 url 中返回解析出的结构
 * @param inputUrlLike
 */
export const url2card = async (
  inputUrlLike: string,
): Promise<IApi<ICardBody>> => {
  const urlParsed = extractFirstURL(inputUrlLike)
  console.log({ urlParsed })
  if (!urlParsed)
    return {
      success: false,
      message: `invalid url to be parsed from ${inputUrlLike}`,
    }

  const wechatArticleId =
    /mp.weixin.qq.com\/s\/(.*)$/.exec(urlParsed)?.[1] ?? null
  if (wechatArticleId) {
    console.log("wechat matched")
    const dataInDB = await prisma.wechatArticle.findUnique({
      where: { id: wechatArticleId },
    })

    const article = await fetchWechatArticle(
      wechatArticleId,
      {
        get: async (id) => dataInDB?.contentSummary ?? null,
      },
      {
        provider: "wxapi",
        get: async (url) =>
          // obj
          dataInDB?.stat !== null
            ? {
                stat: dataInDB?.stat,
                comments: dataInDB?.comments ?? [],
              }
            : null,
      },
    )
    const wechatArticleDetail = await prisma.wechatArticle.upsert({
      where: { id: wechatArticleId },
      create: article,
      update: article,
      ...wechatArticleDetailSchema,
    })
    console.log("-- article: ", article)

    return {
      success: true,
      data: wechatArticle2card(wechatArticleDetail),
    }
  }

  if (/xhslink|xiaohongshu/.test(urlParsed)) {
    const data = await fetchXiaoHongShuDetail(urlParsed)
    if (!data)
      return {
        success: false,
        message: `failed to fetch xiaohongshu detail from url ${urlParsed}, please try again`,
      }

    return {
      success: true,
      data: xiaohongshu2card(data),
    }
  }

  if (/bilibili|b23.tv/.test(urlParsed)) {
    let bvid: string | null
    if (/bilibili/.test(urlParsed)) bvid = getBvidFromUrl(urlParsed)
    else bvid = (await fetchBvidFromb23tv(urlParsed)).data ?? null

    if (!bvid)
      return {
        success: false,
        message: `invalid bilibili url to be parsed from ${urlParsed}`,
      }

    const resDetail = await fetchBilibiliDetail(bvid)
    if (!resDetail.success)
      return { success: false, message: resDetail.message }

    return {
      success: true,
      data: bilibili2card(resDetail.data),
    }
  }

  return { success: false, message: "couldn't decide which platform is" }
}
