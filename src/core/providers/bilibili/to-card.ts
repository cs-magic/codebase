import { IBilibiliVideoDetail } from "../../../../packages/common-bilibili/schema"
import { getBilibiliIFrameUrl } from "../../../../packages/common-bilibili/utils"
import { ICardBody } from "../../../schema/card"

export const bilibili2card = (data: IBilibiliVideoDetail): ICardBody => {
  const { width, height } = data.View.dimension
  return {
    platform: "bilibili",
    title: data.View.title,
    content: data.View.desc,
    images: [
      { url: data.View.pic, dimension: { width, height }, type: "image" },
    ],
    iFrames: [
      {
        url: getBilibiliIFrameUrl({ bvid: data.View.bvid }),
        dimension: { width, height },
        type: "iFrame",
      },
    ],
  }
}
