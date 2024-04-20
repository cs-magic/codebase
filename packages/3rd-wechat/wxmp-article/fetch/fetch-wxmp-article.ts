import { parseWxmpArticleUrl } from "@cs-magic/p01-card/src/core/card-platform/wechat-article/utils"
import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-card/src/schema/card"
import {
  cardDetailSchema,
  ICardDetail,
} from "@cs-magic/prisma/schema/card.detail"
import { prisma } from "../../../common-db/providers/prisma"
import { fetchWxmpArticleViaFastapi } from "./approaches/fastapi"
import { fetchWxmpArticleViaNodejs } from "./approaches/nodejs"

export const fetchWxmpArticle = async (
  url: string,
  options?: GenWxmpArticleCardFetchOptions,
): Promise<ICardDetail> => {
  const data = parseWxmpArticleUrl(url)

  let found: ICardDetail | null = null

  if (options?.withCache) {
    found = await prisma.card.findFirst({
      where: {
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
        contentSummary: options?.detail?.summary?.model
          ? {
              path: ["options", "model"],
              equals: options?.detail?.summary.model,
            }
          : undefined,
      },
      ...cardDetailSchema,
    })
  }

  // console.log({ found })

  if (!found) {
    const newItem =
      options?.detail?.request?.backendType === "fastapi"
        ? await fetchWxmpArticleViaFastapi(url, options?.detail.summary)
        : await fetchWxmpArticleViaNodejs(url, options?.detail)

    found = await prisma.card.create({
      data: newItem,
      ...cardDetailSchema,
    })
    // console.log({ found })
  }

  return found
}
