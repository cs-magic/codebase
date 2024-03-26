import { IBilibiliVideo } from "./schema"

/**
 * sample: https://www.bilibili.com/video/BV1yW4y1L7wA/?spm_id_from=333.880.my_history.page.click
 * @param {string} url
 * @returns {string}
 */
export const getBvidFromUrl = (url: string): string | null => {
  const m = url.match(/(BV.*?)(?=(\/|$))/)
  return m ? m[1] ?? null : m
}

export const getBilibiliIFrameUrl = (video: IBilibiliVideo) => {
  const bvid = getBvidFromUrl(video.url)

  let url = "//player.bilibili.com/player.html"
  url += `?bvid=${bvid}&cid=794775520`
  // url += `&cid=${cid}`
  url += `&danmaku=${video.enableDanmu ?? 0}`
  url += `&high_quality=${video.enableHighQuality ?? 1}`
  url += `&&autoplay=0` // 禁止自动播放，ref: https://www.sunzhongwei.com/video-websites-embed-bilibili-iframe-code-video-disable-play-automatically

  return url
}
