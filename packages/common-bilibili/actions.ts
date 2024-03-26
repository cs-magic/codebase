"use server"

export const getBilibiliSummary = async (bvid: string) => {
  const res = await fetch(
    `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`,
  )

  const data = await res.json()

  console.log("getBilibiliDetail: ", data)

  if (data.code !== 0) throw new Error(JSON.stringify(data))

  return data.data[0]
}
