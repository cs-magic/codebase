import { logger, prisma } from "@cs-magic/common"
import { cardDetailSchema } from "@cs-magic/common/schema/card.detail"
import { formatString } from "@cs-magic/common/utils/format-string"
import { wxmpRequest } from "./wxmp-request"
import { FetchWxmpArticleRes } from "@cs-magic/wechat/wxmp-article"
import { md2summary } from "@cs-magic/wechat/wxmp-article/fetch/approaches/nodejs/md2summary"
import { GenWxmpArticleCardFetchOptions } from "../schema"
import { parseWxmpArticleUrl } from "./parse-wxmp-article-url"

export const fetchWxmpArticle = async (
  url: string,
  options?: GenWxmpArticleCardFetchOptions,
): Promise<FetchWxmpArticleRes> => {
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
      data: await wxmpRequest(url, options?.detail?.request),
    })
  }

  logger.debug(`-- article: ${formatString(JSON.stringify(article), 120)}`)

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
    const response = await md2summary(
      article.contentMd!,
      options?.detail?.summary,
      // todo: add summaryOptions with user
    )
    llmResponse = await prisma.llmResponse.create({
      data: {
        // use query id as the storage id
        id: response.query.id,
        cardId: article.id,
        response: JSON.stringify(response),
      },
    })
  }

  logger.debug(
    `-- llmResponse: ${formatString(JSON.stringify(llmResponse), 120)}`,
  )

  return {
    article,
    llmResponse,
  }
}
