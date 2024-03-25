import { useEffect, useState } from "react"

export interface IBilibiliVideo {
  url: string
  width?: number // default: 1080, w>=420的时候有调控选项
  height?: number // default: 720
  enableDanmu?: number // 0: disable; 1: enable; default: 0
  enableHighQuality?: number // 0: disable; 1: enable; default: 1
}

export const BilibiliVideo = ({
  video,
}: {
  video: IBilibiliVideo
}): JSX.Element => {
  /**
   * -- 参考
   * - 「馨客栈研究院」网站嵌入bilibili视频的一些总结 - 哔哩哔哩, https://www.bilibili.com/read/cv6775208
   *
   * -- 弹幕
   * 弹幕功能可以通过url param (danmaku={0,1})控制，或者在视频里手动点击切换
   * 推荐通过 url 参数选择一个默认的（不可改变的）弹幕偏好，否则动态修改url会导致组件重新渲染，视频也会从头播放
   * 然后用户再在视频里手动选择弹幕开关与否
   * 默认关闭，提供纯享体验
   *
   * -- 分辨率
   * 分辨率虽然在右下角可以选择360/720/1080，但是实测在 iFrame 里最大只能选 720，选 1080 会失败
   * 它通过 high_quality={1,0} 控制低清（360）与高清（720）分辨率的切换
   *
   */

  const bvid = getBvidFromUrl(video.url)
  const [cid, setCid] = useState("")

  // useEffect(() => {
  //   if (!bvid) return
  //   getCid(bvid).then((cid) => setCid(cid))
  // }, [bvid])

  let url = "//player.bilibili.com/player.html"
  url += `?bvid=${bvid}&cid=794775520`
  // url += `&cid=${cid}`
  url += `&danmaku=${video.enableDanmu ?? 0}`
  url += `&high_quality=${video.enableHighQuality ?? 1}`
  url += `&&autoplay=0` // 禁止自动播放，ref: https://www.sunzhongwei.com/video-websites-embed-bilibili-iframe-code-video-disable-play-automatically

  return (
    <>
      <iframe
        title={url} // todo: title from bilibili
        src={url}
        width={video.width ?? "100%"}
        height={video.height ?? "100%"}
        allowFullScreen
      />

      {/*<div>url: {url}</div>*/}
    </>
  )
}

/**
 * sample: https://www.bilibili.com/video/BV1yW4y1L7wA/?spm_id_from=333.880.my_history.page.click
 * @param {string} url
 * @returns {string}
 */
export const getBvidFromUrl = (url: string): string | null => {
  const m = url.match(/(BV.*?)(?=(\/|$))/)
  return m ? m[1] ?? null : m
}

export const getCid = async (bvid: string): Promise<string> => {
  const res = await fetch(
    `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`,
  )
  const data = await res.json()
  return data.data[0].cid
}
