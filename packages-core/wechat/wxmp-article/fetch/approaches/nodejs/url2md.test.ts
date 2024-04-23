import { sampleWxmpArticleUrl } from "../../../../../../sample"
import { requestPage } from "./requestPage"

it("should ", async () => {
  const data = await requestPage(sampleWxmpArticleUrl)
  expect(data.html).not.toContain("异常")
})
