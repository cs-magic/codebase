import { dumpJson } from "@cs-magic/common/utils/dump-json"
import { fetchWxmpArticleWithCache } from "../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import {
  sampleUrl,
  simulatorWxmpArticleViaContent,
  simulatorWxmpArticleViaTestFile,
} from "./card-simulator.test.base"

describe("", () => {
  it("should fetch article", async () => {
    const res = await fetchWxmpArticleWithCache(sampleUrl, {
      // summaryModel: "gpt-3.5-turbo",
    })
    await dumpJson(res, `wxmp-article.sample.${Date.now()}.json`)
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
    await dumpJson(res, `wxmp-article.sample.${Date.now()}.json`)

    await simulatorWxmpArticleViaContent(JSON.stringify(res))
  }, 3e5)
})
