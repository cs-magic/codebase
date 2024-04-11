"use server"

import { parseWxmpArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { ICardGenOptions } from "@/schema/card"
import { cardDetailSchema, ICardDetail } from "@/schema/card.basic"
import { prisma } from "../../common-db/providers/prisma"
import { fetchWxmpArticleViaFastapi } from "./fetch-wxmp-article-via-fastapi"
import { fetchWxmpArticleViaNodejs } from "./fetch-wxmp-article-via-nodejs"
import { findWxmpArticle } from "./find-wxmp-article"

export const fetchWxmpArticleWithCache = async (
  url: string,
  options?: ICardGenOptions,
): Promise<ICardDetail> => {
  const data = parseWxmpArticleUrl(url)

  let found = await findWxmpArticle(data, options?.summaryModel)

  console.log({ found })

  if (!found) {
    const newItem =
      options?.backendEngineType === "fastapi"
        ? await fetchWxmpArticleViaFastapi(url, options)
        : await fetchWxmpArticleViaNodejs(url, options)

    found = await prisma.card.create({
      data: newItem,
      ...cardDetailSchema,
    })
    console.log({ found })
  }

  return found
}
