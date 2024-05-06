import {
  sampleUser,
  sampleWxmpArticleUrl,
  sampleWxmpArticleUrls,
} from "@cs-magic/p01-common/sample"
import { url2preview } from "@cs-magic/p01-common/url2preview"
import { CardSimulator } from "../../../../../packages-to-classify/spider/card-simulator"

describe("test parser", () => {
  const parser = new CardSimulator("playwright", { headless: false })
  const user = sampleUser

  const parseUrl = async (url: string) => {
    const { cardUrl } = await parser.genCard(
      JSON.stringify(await url2preview(url)),
      user,
    )
    console.log(cardUrl)
    return cardUrl
  }

  it("test single url", async () => {
    await parseUrl(sampleWxmpArticleUrl)
  }, 300e3)

  it("test multiple urls", async () => {
    await Promise.all(
      sampleWxmpArticleUrls.slice(0).map(async (url) => {
        await parseUrl(url)
      }),
    )
  }, 300e3)
})
