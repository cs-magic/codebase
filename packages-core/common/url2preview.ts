import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import { logger } from "@cs-magic/log/logger"
import {
  GenWxmpArticleCardFetchOptions,
  ICardInnerPreview,
  IMedia,
} from "./schema/card"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { ILlmRes } from "../../packages-to-classify/llm/schema/llm.api"
import { fetchWxmpArticle } from "../wechat/wxmp-article/fetch"
import { parseSummary } from "./utils/parse-summary"

export const url2preview = async (
  url: string,
  fetchOptions?: GenWxmpArticleCardFetchOptions,
) => {
  const result = await fetchWxmpArticle(url, fetchOptions)
  const llmResponse = parseJsonSafe<ILlmRes>(result.llmResponse.response)
  const response = llmResponse?.response
  if (!response) throw new Error("llm no response")

  const inner: ICardInnerPreview = {
    id: result.llmResponse.id,
    author: parseJsonSafe<IUserSummary>(result.article.author),
    cover: parseJsonSafe<IMedia>(result.article.cover),
    platformType: result.article.platformType,
    sourceUrl: result.article.sourceUrl,
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
