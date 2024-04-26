import { sampleUser, sampleWxmpArticleUrl } from "@cs-magic/p01-common/sample"
import { url2preview } from "@cs-magic/p01-common/url2preview"
import { CardSimulator } from "../../../../../packages-to-classify/spider/card-simulator"

const testParser = async () => {
  const parser = new CardSimulator("playwright", { headless: false })
  const user = sampleUser

  const inner = await url2preview(sampleWxmpArticleUrl)

  const { cardUrl } = await parser.genCard(JSON.stringify(inner), user)

  console.log({ cardUrl })
}

it("should passed parser", async () => {
  await testParser()
}, 30e3)
