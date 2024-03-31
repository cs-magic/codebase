import { IXiaoHongShuNotePageData } from "../../../../packages/common-xiaohongshu/schema"
import { ICardBody } from "../../../schema/card"

export const xiaohongshu2card = (data: IXiaoHongShuNotePageData): ICardBody => {
  const note = data.note.noteDetailMap[data.note.firstNoteId]?.note
  if (!note) throw new Error("no note")

  return {
    platform: "xiaohongshu",
    title: note.title,
    content: note.desc,
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
