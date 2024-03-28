"use server"

import { IApi } from "../common-api/schema"
import { IBilibiliVideoDetail } from "./schema"

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

export const fetchBilibiliDetail = async (
  bvid: string,
): Promise<IApi<IBilibiliVideoDetail>> => {
  const url = `https://api.bilibili.com/x/web-interface/wbi/view/detail?bvid=${bvid}&need_view=1`
  console.debug({ url })

  const res = await fetch(url, {
    headers: {
      Cookie:
        "SESSDATA=e4af78fd%2C1726891541%2C3bae6%2A32CjD_F64Z3XX4qdJKQGL2z8q63OzAqcVkS15xyt_roEp3gF1_3jVXkGxGrjYyBiOTZlISVjlodklKckE5TlIzYmZZNHJsSWY1clZsLUxKcWJCMVJCV3RuWnhndWV2RVRfNVlJamZka1V0SmdZYTc4M1phd3VlYWJka0NncnFXZGRDVlhySVN4cjdnIIEC",
    },
  })

  const json = await res.json()
  // console.debug("getBilibiliDetail: ", JSON.stringify(json, null, 2))

  if (json.code !== 0)
    return { success: false, message: JSON.stringify(json, null, 2) }

  const data = json.data as IBilibiliVideoDetail
  console.log(
    "-- got bilibili detail",
    // data.View
  )
  return { success: true, data }
}
