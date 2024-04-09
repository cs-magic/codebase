"use server"

import { Card, Prisma } from "@prisma/client"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import { IBilibiliVideoDetail } from "../../../../packages/3rd-bilibili/schema"
import { getBilibiliIFrameUrl } from "../../../../packages/3rd-bilibili/utils"

export const bilibili2card = (
  inputData: IBilibiliVideoDetail,
): Promise<Card> => {
  const { width, height } = inputData.View.dimension
  const ratio = width / height

  const data: Prisma.CardUncheckedCreateInput = {
    createdAt: null,
    updatedAt: null,
    contentSummary: null,
    time: null,
    contentMd: null,
    author: null,
    stat: null,
    platformData: null,

    sourceUrl: null,

    platformId: inputData.View.bvid,
    cover: { url: inputData.View.pic, ratio, type: "image" },
    videos: [],
    platformType: "bilibiliVideo",
    title: inputData.View.title,
    description: inputData.View.desc,
    images: [],
    iFrames: [
      {
        url: getBilibiliIFrameUrl({ bvid: inputData.View.bvid }),
        ratio,
        type: "iFrame",
      },
    ],
  }

  return prisma.card.upsert({
    where: {
      platformType_platformId: {
        platformType: "bilibiliVideo",
        platformId: inputData.View.bvid,
      },
    },
    create: data,
    update: data,
  })
}
