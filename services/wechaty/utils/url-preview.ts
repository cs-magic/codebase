import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import { logger } from "@cs-magic/log/logger"
import {
  GenWxmpArticleCardFetchOptions,
  ICardInnerPreview,
  IMedia,
} from "@cs-magic/p01-card/src/schema/card"
import { parseSummary } from "@cs-magic/p01-card/src/utils/parse-summary"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { fetchWxmpArticle } from "../../../core/wechat/wxmp-article/fetch"

import { ILlmRes } from "../../../packages/llm/schema/llm.api"

export const url2preview = async (
  url: string,
  fetchOptions?: GenWxmpArticleCardFetchOptions,
) => {
  const result = await fetchWxmpArticle(url, fetchOptions)

  const response = parseJsonSafe<ILlmRes>(result.llmResponse.response)

  const inner: ICardInnerPreview = {
    id: result.llmResponse.id,
    author: parseJsonSafe<IUserSummary>(result.article.author),
    cover: parseJsonSafe<IMedia>(result.article.cover),
    platformType: result.article.platformType,
    sourceUrl: result.article.sourceUrl,
    time: result.article.time,
    title: result.article.title,
    summary: {
      parsed: parseSummary(response?.response?.choices[0]?.message.content),
      model: response?.options.model ?? "gpt-3.5-turbo",
    },
  }
  logger.info(`-- inputting: %o`, inner)
  return inner
}
