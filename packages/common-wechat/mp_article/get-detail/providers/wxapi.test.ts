import { fetchWechatArticleComments, fetchWechatArticleStat } from "./wxapi"

describe("wxapi", () => {
  const url = "https://mp.weixin.qq.com/s/OdmjL50Jy8ZYFesKNsvutg"

  test("stat ok", async () => {
    const stat = await fetchWechatArticleStat(url)
    expect(stat.readnum).toBeGreaterThan(0)
  })

  test("comments ok", async () => {
    const comments = await fetchWechatArticleComments(url)
    expect(comments.length).toBeGreaterThan(0)
  })
})
