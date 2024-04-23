import last from "lodash/last"
import { sampleWxmpArticleUrls } from "../../../config"
import { requestPage } from "./requestPage"

it("should ", async () => {
  const data = await requestPage(last(sampleWxmpArticleUrls)!)
  expect(data.html).not.toContain("异常")
})
