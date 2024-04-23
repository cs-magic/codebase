import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import {
  GenWxmpArticleCardFetchOptions,
  ICardInnerPreview,
  IMedia,
} from "@cs-magic/p01-card/src/schema/card"
import { parseWxmpArticleUrl } from "@cs-magic/p01-card/src/utils/card-platform/wechat-article/utils"
import { parseSummary } from "@cs-magic/p01-card/src/utils/parse-summary"
import { cardDetailSchema } from "@cs-magic/prisma/schema/card.detail"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { prisma } from "../../../../packages/db/providers/prisma"

import { ILlmRes } from "../../../../packages/llm/schema/llm.api"
import { md2summary } from "./approaches/nodejs/md2summary"
import { requestPage } from "./approaches/nodejs/requestPage"

export const fetchWxmpArticle = async (
  url: string,
  options?: GenWxmpArticleCardFetchOptions,
) => {
  if (options?.detail?.request?.backendType === "fastapi")
    throw new Error("fastapi backend is currently unsupported out of design")

  const data = parseWxmpArticleUrl(url)

  let article = await prisma.card.findFirst({
    where: {
      platformType: "wxmpArticle",
      OR: [
        {
          platformId: data.platformId ?? "",
        },
        {
          // json filter, ref: https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields#filter-on-nested-object-property
          platformData: {
            path: ["sn"],
            equals: data.platformData.sn ?? "",
          },
        },
      ],
    },
    ...cardDetailSchema,
  })

  if (!article) {
    article = await prisma.card.create({
      data: await requestPage(url, options?.detail?.request),
    })
  }

  const model = options?.detail?.summary?.model ?? "gpt-3.5-turbo"

  // console.log({ found })
  let llmResponse = await prisma.llmResponse.findFirst({
    where: {
      cardId: article.id,
      response: {
        path: ["options", "model"],
        equals: model,
      },
    },
  })
  if (!llmResponse) {
    llmResponse = await prisma.llmResponse.create({
      data: {
        cardId: article.id,
        response: JSON.stringify(
          await md2summary(article.contentMd!, options?.detail?.summary),
        ),
      },
    })
  }

  const response = parseJsonSafe<ILlmRes>(llmResponse.response)
  const inner: ICardInnerPreview = {
    id: llmResponse.id,
    summary: {
      parsed: parseSummary(response?.response?.choices[0]?.message.content),
      model: response?.options.model ?? "gpt-3.5-turbo",
    },
    title: article.title,
    time: article.time,
    sourceUrl: article.sourceUrl,
    platformType: article.platformType,
    cover: parseJsonSafe<IMedia>(article.cover),
    author: parseJsonSafe<IUserSummary>(article.author),
  }

  return { inner }
}
