import Image from "next/image"
import { useEffect, useState } from "react"

import { getBilibiliDetail } from "./actions-client"
import {
  BilibiliDisplayType,
  IBilibiliVideo,
  IBilibiliVideoDetail,
} from "./schema"
import { getBilibiliIFrameUrl, getBvidFromUrl } from "./utils"

/**
 *
 *  -- 参考
 *  - 「馨客栈研究院」网站嵌入bilibili视频的一些总结 - 哔哩哔哩, https://www.bilibili.com/read/cv6775208
 *
 *  -- 弹幕
 *  弹幕功能可以通过url param (danmaku={0,1})控制，或者在视频里手动点击切换
 *  推荐通过 url 参数选择一个默认的（不可改变的）弹幕偏好，否则动态修改url会导致组件重新渲染，视频也会从头播放
 *  然后用户再在视频里手动选择弹幕开关与否
 *  默认关闭，提供纯享体验
 *
 *  -- 分辨率
 *  分辨率虽然在右下角可以选择360/720/1080，但是实测在 iFrame 里最大只能选 720，选 1080 会失败
 *  它通过 high_quality={1,0} 控制低清（360）与高清（720）分辨率的切换
 *
 *  cid 参考：哔哩哔哩外链播放器 - 使用说明, https://player.bilibili.com/
 *
 * @param video
 * @param displayType
 * @constructor
 */
export const BilibiliVideo = ({
  video,
  displayType = "video",
}: {
  video: IBilibiliVideo
  displayType?: BilibiliDisplayType
}) => {
  const bvid = getBvidFromUrl(video.url)
  const [detail, setDetail] = useState<IBilibiliVideoDetail | null>(null)
  console.log({ bvid, detail })

  const url = getBilibiliIFrameUrl(video)
  const cover = detail?.View.pic
  console.log({ url, cover })

  useEffect(() => {
    if (!bvid) return
    void getBilibiliDetail(bvid).then(setDetail)
  }, [bvid])

  switch (displayType) {
    case "video":
      return !bvid ? null : (
        <iframe
          title={detail?.View.title}
          src={url}
          width={video.width ?? "100%"}
          height={video.height ?? "100%"}
          allowFullScreen
        />
      )

    case "cover":
      return !cover ? null : <Image src={cover} alt={"cover"} fill />

    case "gif":
    default:
      console.error("unexpected")
  }
}
