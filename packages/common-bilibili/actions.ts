"use server"

import { IApi } from "../common-api/schema"

export const getBilibiliSummary = async (bvid: string) => {
  const res = await fetch(
    `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`,
  )

  const data = await res.json()

  console.log("getBilibiliDetail: ", data)

  if (data.code !== 0) throw new Error(JSON.stringify(data))

  return data.data[0]
}

/**
 * @param url e.g. https://b23.tv/sbodfSp
 */
export const fetchBvidFromb23tv = async (
  url: string,
): Promise<IApi<string>> => {
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
