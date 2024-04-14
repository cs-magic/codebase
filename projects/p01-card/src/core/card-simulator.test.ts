import { promises } from "fs"
import path from "path"
import { fetchWxmpArticleWithCache } from "../../../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { dumpJSON } from "../../../common-common/dump-json"
import { generatedPath } from "../../../common-common/path"
import { CardSimulator } from "./card-simulator"

const simulatorWxmpArticleViaContent = async (content: string) => {
  const simulator = new CardSimulator("playwright", { headless: false })

  const { cardUrl } = await simulator.genCard(content, {
    id: "",
    name: "南川 Mark",
    image:
      "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4RANEFJicrdF4P3MaPCJNaRc9VrCKWCsyDlsZgzn6MPww/0",
  })

  console.log(`-- sending file: ${cardUrl}`)
}

const simulatorWxmpArticleViaTestFile = async (fn: string) => {
  const content = await promises.readFile(path.join(generatedPath, fn), {
    encoding: "utf-8",
  })

  return simulatorWxmpArticleViaContent(content)
}

const sampleUrl =
  // "http://mp.weixin.qq.com/s?__biz=MzI4NTgxMDk1NA==&amp;mid=2247490896&amp;idx=2&amp;sn=568f4c0a22313f5269f9fada94206ef4&amp;chksm=ebe7d535dc905c2308bdb321218da67ffe8a0fd3\n2b63ef4bf6ecd706c43f86a12824dc329406&amp;mpshare=1&amp;scene=1&amp;srcid=0404tbqm2VUZRS72SUkVwq94&amp;sharer_shareinfo=481652bc83d18c4898309e7f413e6bae&amp;sharer_shareinfo_first=ae44e63fe8de9e05a5b6d5dfef67ce2c#rd"
  // "https://mp.weixin.qq.com/s/xKVI3E0SZE49J4vwVH_MZw"
  "https://mp.weixin.qq.com/s/HdVZGKjViUVe1bd9v17ANQ"

describe("", () => {
  it("should fetch article", async () => {
    const res = await fetchWxmpArticleWithCache(sampleUrl, {
      // summaryModel: "gpt-3.5-turbo",
    })
    await dumpJSON(res, `wxmp-article.sample.${Date.now()}.json`)
  }, 2e4)

  it(
    "should generate a right card via test file",
    () =>
      simulatorWxmpArticleViaTestFile("wxmp-article.sample.1712633905649.json"),
    3e5,
  )

  it("should generate a right card via source url", async () => {
    const res = await fetchWxmpArticleWithCache(sampleUrl, {
      summaryModel: "gpt-3.5-turbo",
      // summaryModel: "gpt-4",
    })
    await dumpJSON(res, `wxmp-article.sample.${Date.now()}.json`)

    await simulatorWxmpArticleViaContent(JSON.stringify(res))
  }, 3e5)
})
