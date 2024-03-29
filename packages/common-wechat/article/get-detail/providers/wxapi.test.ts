import dotenv from "dotenv"
import { fetchWechatArticleComments, fetchWechatArticleStat } from "./wxapi"

const url = "https://mp.weixin.qq.com/s/OdmjL50Jy8ZYFesKNsvutg"

describe("wxapi without token", () => {
  test("no token", async () => {
    const stat = await fetchWechatArticleStat(url)
    expect(stat.code).toBe(-1002)
    expect(stat.msg).toBe("无此用户")
  })
})

describe("wxapi with token", () => {
  beforeAll(() => {
    dotenv.config()
  })

  test("stat ok", async () => {
    const resStat = await fetchWechatArticleStat(url)
    expect(resStat.code).toBe(0)
    expect(resStat.data!.readnum).toBeGreaterThan(0)
  })

  test("comments ok", async () => {
    const resComments = await fetchWechatArticleComments(url)
    expect(resComments.code).toBe(0)
    expect(resComments.data!.length).toBeGreaterThan(0)
  })
})
