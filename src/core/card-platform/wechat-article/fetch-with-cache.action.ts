"use server"

import { Prisma } from "@prisma/client"
import { fetchArticleSummary } from "../../../../packages/common-article/core"
import { IArticleSummaryParsed } from "../../../../packages/common-article/schema"
import { parseSummary } from "../../../../packages/common-article/utils"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import {
  fetchWechatArticleComments,
  fetchWechatArticleStat,
} from "../../../../packages/common-platform-wechat/article/detail/providers/wxapi"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../../../packages/common-platform-wechat/article/detail/schema"
import { parseWechatArticle } from "../../../../packages/common-platform-wechat/article/utils"
import { ICardGenOptions, ICardPlatform, IModel } from "../../../schema/card"
import { cardBasicSchema } from "../../../schema/card.basic"
import { $Enums } from ".prisma/client"

export const fetchWechatArticleAction = async (
  sourceUrl: string,
  options?: ICardGenOptions,
) => {
  const platformType: $Enums.PlatformType = "wechatArticle"
  console.log("-- fetchWechatArticle: ", { url: sourceUrl })

  const { platformId, contentMd, author, time, title, cover } =
    await parseWechatArticle(sourceUrl)

  // 2.1.1 get data from id
  const dataInDB = await prisma.card.findUnique({
    where: { platformType_platformId: { platformType, platformId } },
  })
  let model: IModel | null = dataInDB?.model ?? null

  let contentSummary: string | null | undefined = undefined

  if (contentMd) {
    // 2.1. cache summary
    if (!options?.summary.cacheIgnored) {
      contentSummary = dataInDB?.contentSummary
      if (contentSummary) console.log("-- summary cached")
    }

    // 2.2. fetch summary
    if (options?.summary.enabled && !contentSummary) {
      console.log("-- summary fetching")
      const { content, model: modelName } =
        (await fetchArticleSummary(contentMd)) ?? null
      console.log("-- summary fetched")
      model = { name: modelName }
      contentSummary = content
    }
  }

  const platformData: ICardPlatform<"wechatArticle"> = {}
  let comments: IWechatArticleComment[] | null | undefined = undefined
  let stat: IWechatArticleStat | null | undefined = undefined
  // 3.1. stat
  if (options?.stat.enabled) {
    if (!options?.stat.cacheIgnored) stat = dataInDB?.stat
    if (!stat) stat = (await fetchWechatArticleStat(platformId)).data
  }

  // 3.2. comments
  if (options?.comments.enabled) {
    if (!options.comments.cacheIgnored)
      platformData.comments = dataInDB?.platformData.comments // todo: type safe
    if (!comments)
      comments = (await fetchWechatArticleComments(platformId)).data
  }

  const data: Prisma.CardUncheckedCreateInput = {
    platformType,
    platformId,
    author,
    time,
    title,
    cover,
    platformData,
    contentMd,
    contentSummary,
    stat,
    sourceUrl,
    model,
  }
  const wechatArticleInDB = await prisma.card.upsert({
    where: { platformType_platformId: { platformId, platformType } },
    create: data,
    update: data,
    ...cardBasicSchema,
  })

  const { id } = wechatArticleInDB
  console.log(`-- card upserted: `, { id, platformId, platformType })

  return wechatArticleInDB
}
