import { IApi } from "../common-api/schema"
import { IBilibiliVideo } from "./schema"

/**
 * sample: https://www.bilibili.com/video/BV1yW4y1L7wA/?spm_id_from=333.880.my_history.page.click
 * @param {string} url
 * @returns {string}
 */
export const getBvidFromUrl = (url: string): string | null => {
  const m = url.match(/(BV.*?)(?=(\/|$))/)
  return m?.[1] ?? null
}

export const getBilibiliIFrameUrl = (video: IBilibiliVideo) => {
  let url = "//player.bilibili.com/player.html"
  url += `?bvid=${video.bvid}&cid=794775520`
  // url += `&cid=${cid}`
  url += `&danmaku=${video.enableDanmu ?? 0}`
  url += `&high_quality=${video.enableHighQuality ?? 1}`
  url += `&&autoplay=0` // 禁止自动播放，ref: https://www.sunzhongwei.com/video-websites-embed-bilibili-iframe-code-video-disable-play-automatically

  return url
}

/**
 * @param url e.g. https://b23.tv/sbodfSp
 */
export const getBvidFromb23tv = async (url: string): Promise<IApi<string>> => {
  const res = await fetch(url, {
    method: "HEAD",
    redirect: "manual",
  })

  if (res.status === 302) {
    const location = res.headers.get("location")
    if (location) {
      const m = /^.*?video\/(.*?)\?.*?$/.exec(location)
      // console.log({ m })
      const newUrl = m?.[0]
      const bvid = m?.[1]
      if (bvid) {
        console.log({ rawUrl: url, newUrl, bvid })
        return { success: true, data: bvid }
      }
    }
  }

  return { success: false, message: `not found bvid from ${url}` }
}
