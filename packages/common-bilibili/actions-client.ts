"use server"

import { IBilibiliVideoDetail } from "./schema"

export const fetchBilibiliDetail = async (
  bvid: string,
): Promise<IBilibiliVideoDetail> => {
  const url = `https://api.bilibili.com/x/web-interface/wbi/view/detail?bvid=${bvid}&need_view=1`
  console.debug({ url })

  const res = await fetch(url, {
    headers: {
      Cookie:
        "SESSDATA=e4af78fd%2C1726891541%2C3bae6%2A32CjD_F64Z3XX4qdJKQGL2z8q63OzAqcVkS15xyt_roEp3gF1_3jVXkGxGrjYyBiOTZlISVjlodklKckE5TlIzYmZZNHJsSWY1clZsLUxKcWJCMVJCV3RuWnhndWV2RVRfNVlJamZka1V0SmdZYTc4M1phd3VlYWJka0NncnFXZGRDVlhySVN4cjdnIIEC",
    },
  })

  const data = await res.json()
  console.debug("getBilibiliDetail: ", data)

  if (data.code !== 0) throw new Error(JSON.stringify(data))

  return data.data
}
