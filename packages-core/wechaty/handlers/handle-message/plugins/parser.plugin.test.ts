import {
  sampleWxmpArticleUrl,
  sampleWxmpArticleUrls,
} from "@cs-magic/common/sample"
import { sampleUser } from "@cs-magic/prisma/sample"
import { wxmpUrl2preview } from "@cs-magic/wechat/utils/wxmpUrl2preview"
import { CardSimulator } from "../../../../../packages-to-classify/spider/card-simulator"

describe("test parser", () => {
  const parser = new CardSimulator("playwright", { headless: false })
  const user = sampleUser

  const parseUrl = async (url: string) => {
    const { cardUrl } = await parser.genCard(
      JSON.stringify(await wxmpUrl2preview(url)),
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
