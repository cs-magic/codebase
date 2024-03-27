import { IApi } from "../../packages/common-api/schema"
import {
  fetchBilibiliDetail,
  fetchBvidFromb23tv,
} from "../../packages/common-bilibili/actions"
import { IBilibiliVideoDetail } from "../../packages/common-bilibili/schema"
import {
  getBilibiliIFrameUrl,
  getBvidFromUrl,
} from "../../packages/common-bilibili/utils"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { fetchXiaoHongShuDetail } from "../../packages/common-xiaohongshu/actions"
import { IXiaoHongShuNotePageData } from "../../packages/common-xiaohongshu/schema"
import { ICardBody } from "../schema/card"

/**
 * 从用户输入的 url 中返回解析出的结构
 * @param url
 */
export const url2card = async (url: string): Promise<IApi<ICardBody>> => {
  const urlParsed = extractFirstURL(url)
  console.log({ urlParsed })
  if (!urlParsed)
    return {
      success: false,
      message: `invalid url to be parsed from ${url}`,
    }

  if (/xhslink|xiaohongshu/.test(urlParsed)) {
    const data = await fetchXiaoHongShuDetail(urlParsed)
    if (!data)
      return {
        success: false,
        message: `failed to fetch xiaohongshu detail from url ${urlParsed}, please try again`,
      }

    return {
      success: true,
      data: xiaohongshu2card(data),
    }
  }

  if (/bilibili|b23.tv/.test(urlParsed)) {
    let bvid: string | null
    if (/bilibili/.test(urlParsed)) bvid = getBvidFromUrl(urlParsed)
    else bvid = (await fetchBvidFromb23tv(urlParsed)).data ?? null

    if (!bvid)
      return {
        success: false,
        message: `invalid bilibili url to be parsed from ${urlParsed}`,
      }

    const resDetail = await fetchBilibiliDetail(bvid)
    if (!resDetail.success)
      return { success: false, message: resDetail.message }

    return {
      success: true,
      data: bilibili2card(resDetail.data!),
    }
  }

  return { success: false, message: "couldn't decide which platform is" }
}

export const bilibili2card = (data: IBilibiliVideoDetail): ICardBody => {
  const { width, height } = data.View.dimension
  return {
    platform: "bilibili",
    title: data.View.title,
    content: data.View.desc,
    images: [{ url: data.View.pic, width, height }],
    iFrames: [
      {
        url: getBilibiliIFrameUrl({ bvid: data.View.bvid }),
        width,
        height,
      },
    ],
  }
}

export const xiaohongshu2card = (data: IXiaoHongShuNotePageData): ICardBody => {
  const note = data.note.noteDetailMap[data.note.firstNoteId]?.note
  if (!note) throw new Error("no note")

  return {
    platform: "xiaohongshu",
    title: note.title,
    content: note.desc,
    videos: note.video.media.stream.h264.map((v) => ({
      url: `/api/video-proxy?url=${v.masterUrl}`,
      height: v.height,
      width: v.width,
    })),
    images: note.imageList.map((i) => ({
      url: i.urlDefault,
      width: i.width,
      height: i.height,
    })),
  }
}
