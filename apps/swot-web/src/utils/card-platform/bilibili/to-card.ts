"use server"

import { Card, Prisma } from "@prisma/client"
import { IBilibiliVideoDetail } from "@cs-magic/common/bilibili/schema"
import { getBilibiliIFrameUrl } from "@cs-magic/common/bilibili/utils"
import { prisma } from "@cs-magic/common/db/providers/prisma"

export const bilibili2card = (
  inputData: IBilibiliVideoDetail,
): Promise<Card> => {
  const { width, height } = inputData.View.dimension
  const ratio = width / height

  const data: Prisma.CardUncheckedCreateInput = {
    createdAt: new Date(),
    updatedAt: new Date(),
    time: null,
    contentMd: null,
    author: "",
    stat: "",
    platformData: "",

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
