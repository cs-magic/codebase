"use server"

import { Prisma } from "@prisma/client"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import {
  ensureWxmpArticleLongId,
  fetchWechatArticle,
} from "../../../../packages/common-platform-wechat/article/utils"
import { ICardGenOptions } from "../../../schema/card"
import { cardBasicSchema } from "../../../schema/card.basic"
import { $Enums } from ".prisma/client"

export type IFetchWxmpArticleRes = {
  platform: {
    id: string
    type: string
    name: string
  }
  author: {
    id?: string
    name: string
    avatar: string
  }
  time: Date
  title: string
  cover: {
    url: string
    width: null
    height: null
  }
  description: string
  content_md: string
  content_summary?: string
}

export const fetchWechatArticleAction = async (
  sourceUrl: string,
  options?: ICardGenOptions,
): Promise<IFetchWxmpArticleRes> => {
  console.log("-- fetchWechatArticle: ", { sourceUrl })
  const platformType: $Enums.PlatformType = "wxmp-article"
  const platformId = await ensureWxmpArticleLongId(sourceUrl)

  let dataInDB = await prisma.card.findUnique({
    where: {
      platformType_platformId: { platformType, platformId },
    },
  })

  if (!dataInDB || options?.refetchPage) {
    const fetched = await fetchWechatArticle(sourceUrl, options?.refetchSummary)
    const data: Prisma.CardUncheckedCreateInput = {
      platformType,
      platformId,
      author,
      time,
      title,
      cover,
      platformData: dataInDB?.platformData,
      contentMd,
      contentSummary,
      stat: dataInDB?.stat,
      sourceUrl,
      model,
    }
    dataInDB = await prisma.card.upsert({
      where: { platformType_platformId: { platformId, platformType } },
      create: data,
      update: data,
      ...cardBasicSchema,
    })
  }

  if (!dataInDB)
    throw new Error(`failed to fetch wxmp article form url: ${sourceUrl}`)
  return dataInDB
}
