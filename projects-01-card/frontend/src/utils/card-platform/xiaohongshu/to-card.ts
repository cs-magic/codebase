"use server"

import { Card, Prisma } from "@prisma/client"
import { prisma } from "../../../../../../packages-to-classify/db/providers/prisma"
import { IXiaoHongShuNotePageData } from "../../../../../../packages-to-classify/xhs/schema"

export const xiaohongshu2card = (
  inputData: IXiaoHongShuNotePageData,
): Promise<Card> => {
  const note = inputData.note.noteDetailMap[inputData.note.firstNoteId]?.note
  if (!note) throw new Error("no note")

  const data: Prisma.CardUncheckedCreateInput = {
    platformType: "xhsNote",
    platformId: "?",

    stat: "",
    sourceUrl: null,
    contentMd: null,
    platformData: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    cover: "",
    author: "",
    time: null,
    iFrames: [],
    title: note.title,
    description: note.desc,
    videos: note.video.media.stream.h264.map((v) => ({
      url: `/api/video-proxy?url=${v.masterUrl}`,
      dimension: {
        height: v.height,
        width: v.width,
      },
      type: "video",
    })),
    images: note.imageList.map((i) => ({
      url: i.urlDefault,
      dimension: {
        width: i.width,
        height: i.height,
      },
      type: "image",
    })),
  }

  return prisma.card.upsert({
    where: {
      platformType_platformId: {
        platformType: "xhsNote",
        platformId: "?", // todo
      },
    },
    create: data,
    update: data,
  })
}
