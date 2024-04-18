import parse from "node-html-parser"

import { api } from "../../common-api-client/api"
import { parseMetaFromHtml } from "../../common-html/utils"

export const getWechatArticleUrlFromShortId = (shortId: string) =>
  `https://mp.weixin.qq.com/s/${shortId}`

export const parseWxmpArticleShortId = (url: string) =>
  /mp.weixin.qq.com\/s\/(.*?)$/.exec(url)?.[1]

export const parseWxmpArticleLongId = (url: string) =>
  /mp.weixin.qq.com.*?sn=(.*?)&/.exec(url)?.[1]

/**
 * url-short: https://mp.weixin.qq.com/s/T2DpRlMxTSwYIPJm1ZYU6w
 * url-long: http://mp.weixin.qq.com/s?__biz=MjM5MjAyNDUyMA==&amp;mid=2650991323&amp;idx=1&amp;sn=35606561be8182e2dcf373bb22b3f42a&amp;chksm=bd5ad87c8a2d516ab07ad987b2678650e65c01ed5b7908e20d24a36e51263b9f20eb3f822ae8#rd
 * @param url
 */
export const ensureWxmpArticleLongId = async (url: string) => {
  let longId = parseWxmpArticleLongId(url)
  // console.log({ url, longId })
  if (!longId) {
    const { data: pageText } = await api.get<string>(url)
    // console.log({ pageText })
    if (!pageText) throw new Error(`no page content found!`)

    const html = parse(pageText)
    const newUrl = parseMetaFromHtml(html, "og:url", "property")
    // console.log({ newUrl })
    if (newUrl) longId = parseWxmpArticleLongId(newUrl)
    // console.log({ longId })
  }
  if (!longId) throw new Error(`failed to parse longId from url: ${url}`)
  return longId
}
