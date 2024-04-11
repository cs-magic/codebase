import { parseWxmpArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { ICardGenOptions } from "@/schema/card"
import { cardDetailSchema, ICardDetail } from "@/schema/card.basic"
import { fetchWxmpArticleViaFastapi } from "./fetch-wxmp-article-via-fastapi"
import { fetchWxmpArticleViaNodejs } from "./fetch-wxmp-article-via-nodejs"
import { prisma } from "../../common-db/providers/prisma"

export const fetchWxmpArticle = async (
  url: string,
  options?: ICardGenOptions,
): Promise<ICardDetail> => {
  const data = parseWxmpArticleUrl(url)

  let found = await prisma.card.findFirst({
    where: {
      OR: [
        {
          platformId: data.platformId ?? "",
        },
        {
          platformData: {
            string_contains: data.platformData.sn ?? "",
          },
        },
      ],
    },
    ...cardDetailSchema,
  })
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
