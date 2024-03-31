import { CardBody } from "@prisma/client"
import { IXiaoHongShuNotePageData } from "../../../../packages/common-platform-xiaohongshu/schema"

export const xiaohongshu2card = (data: IXiaoHongShuNotePageData): CardBody => {
  const note = data.note.noteDetailMap[data.note.firstNoteId]?.note
  if (!note) throw new Error("no note")

  return {
    platformType: "xiaohongshuNote",
    platformId: "1", // todo
    stat: null,
    sourceUrl: null,
    contentMd: null,
    platformData: null,
    updatedAt: null,
    createdAt: null,
    cover: null,
    author: null,
    time: null,
    summary: null,
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
}
