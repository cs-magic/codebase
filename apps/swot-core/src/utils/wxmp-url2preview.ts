import { logger } from "@cs-magic/common"
import { IUserSummary } from "@cs-magic/common/schema/user.summary"
import { formatWxmpUrl } from "@cs-magic/common/utils/format-wxmp-article"
import { parseJsonSafe } from "@cs-magic/common/utils/parse-json"
import { ILlmRes } from "@cs-magic/llm/schema/llm.api"

import { ICardInnerPreview, IMedia } from "../schema/card.js"
import { GenWxmpArticleCardFetchOptions } from "../schema/wxmp-article.js"
import { parseSummary } from "./parse-summary.js"
import { fetchWxmpArticle } from "./wxmp-fetch.js"

export const wxmpUrl2preview = async (
  url: string,
  fetchOptions?: GenWxmpArticleCardFetchOptions,
) => {
  if (/\/s\?/.test(url)) {
    // logger.debug(`wxmpUrl2preview: url_raw=${url}`)
    const searchParams = new URL(url.replace(/amp;/g, "")).searchParams
    url = formatWxmpUrl({
      __biz: searchParams.get("__biz")!,
      mid: searchParams.get("mid")!,
      idx: searchParams.get("idx")!,
      sn: searchParams.get("sn")!,
      chksm: searchParams.get("chksm")!,
    })
  }

  logger.info(`wxmpUrl2preview: url=${url}`)
  const result = await fetchWxmpArticle(url, fetchOptions)
  const llmResponse = parseJsonSafe<ILlmRes>(result.llmResponse.response)
  const response = llmResponse?.response
  if (!response) throw new Error("llm no response")

  const inner: ICardInnerPreview = {
    id: result.llmResponse.id,
    author: parseJsonSafe<IUserSummary>(result.article.author),
    cover: parseJsonSafe<IMedia>(result.article.cover),
    platformType: result.article.platformType,
    // todo: why this sourceUrl is longer (and downs to be http)?
    // from: https://mp.weixin.qq.com/s?__biz=MzUzMjY0NDY4Ng%3D%3D&mid=2247501975&idx=1&sn=4aaf236bbe699fc823cd21294fd53549&chksm=fab29eb6cdc517a0c4a92e0699aaa702ba5bf5273cf406955cb1fe76474b8ab93c3bb4f3a6ea#rd
    // to: http://mp.weixin.qq.com/s?__biz=MzU
    // zMjY0NDY4Ng==&mid=2247501975&idx=1&sn=4aaf236bbe699fc823cd21294fd53549&chksm=fab29eb6cdc517a0c4a92e0699aaa702ba5bf5273cf406955cb1fe76474b8ab93c3bb4f3a6ea&mpshare=1&scene=1&srcid=05071hBRoirmnwmgxjcJgari&sharer_shareinfo=42ee8660a40a6392e2d2d61eb681e18d&s
    // harer_shareinfo_first=42ee8660a40a6392e2d2d61eb681e18d#rd
    // sourceUrl: result.article.sourceUrl,
    sourceUrl: url,
    time: result.article.time,
    title: result.article.title,
    summary: {
      parsed: parseSummary(response.choices[0]?.message.content),
      model: llmResponse.options.model,
    },
  }

  logger.info(`-- inputting inner: %o`, inner)

  return inner
}
