import { CardBody } from "@prisma/client"
import { IBilibiliVideoDetail } from "../../../../packages/common-platform-bilibili/schema"
import { getBilibiliIFrameUrl } from "../../../../packages/common-platform-bilibili/utils"

export const bilibili2card = (data: IBilibiliVideoDetail): CardBody => {
  const { width, height } = data.View.dimension
  const ratio = width / height
  return {
    createdAt: null,
    updatedAt: null,
    summary: null,
    time: null,
    contentMd: null,
    author: null,
    stat: null,
    platformData: null,

    sourceUrl: null,

    platformId: data.View.bvid,
    cover: { url: data.View.pic, ratio, type: "image" },
    videos: [],
    platformType: "bilibiliVideo",
    title: data.View.title,
    description: data.View.desc,
    images: [],
    iFrames: [
      {
        url: getBilibiliIFrameUrl({ bvid: data.View.bvid }),
        ratio,
        type: "iFrame",
      },
    ],
  }
}
