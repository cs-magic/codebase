"use server"

import { prisma } from "../../../../packages/common-db/providers/prisma"
import { fetchWxmpArticle } from "../../../../packages/common-platform-wechat/wxmp-article/fetch-wxmp-article"
import { ensureWxmpArticleLongId } from "../../../../packages/common-platform-wechat/wxmp-article/utils"
import { ICardGenOptions } from "../../../schema/card"
import { cardDetailSchema, ICardDetail } from "../../../schema/card.basic"
import { $Enums } from ".prisma/client"

export const fetchWechatArticleAction = async (
  sourceUrl: string,
  options?: ICardGenOptions,
): Promise<ICardDetail> => {
  console.log("-- fetchWechatArticle: ", { sourceUrl })
  const platformType: $Enums.PlatformType = "wxmpArticle"
  const platformId = await ensureWxmpArticleLongId(sourceUrl)

  let dataInDB = await prisma.card.findUnique({
    where: {
      platformType_platformId: { platformType, platformId },
      ...cardDetailSchema,
    },
  })

  if (!dataInDB || options?.refetchPage) {
    const fetched = await fetchWxmpArticle(sourceUrl, options)
    dataInDB = await prisma.card.upsert({
      where: {
        platformType_platformId: {
          platformId: fetched.platformId,
          platformType: fetched.platformType,
        },
      },
      create: fetched,
      update: fetched,
      ...cardDetailSchema,
    })
  }

  if (!dataInDB)
    throw new Error(`failed to fetch wxmp article form url: ${sourceUrl}`)
  return dataInDB
}
