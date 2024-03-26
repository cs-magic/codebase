"use server"
import { IBilibiliVideoDetail } from "./schema"

export const getBilibiliDetail = async (
  bvid: string,
): Promise<IBilibiliVideoDetail> => {
  const url = `https://api.bilibili.com/x/web-interface/wbi/view/detail?bvid=${bvid}&need_view=1`
  console.log({ url })

  const res = await fetch(url, {
    // mode: "no-cors",
  })

  const data = await res.json()
  console.log("getBilibiliDetail: ", data)

  if (data.code !== 0) throw new Error(JSON.stringify(data))

  return data.data[0]
}
