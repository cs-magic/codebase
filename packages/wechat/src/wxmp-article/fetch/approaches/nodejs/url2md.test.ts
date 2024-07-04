import { sampleWxmpArticleUrl } from "@cs-magic/common/sample"
import { request } from "@cs-magic/swot-web/src/utils/card-platform/wechat-article/request"

it("should ", async () => {
  const data = await request(sampleWxmpArticleUrl)
  expect(data.html).not.toContain("异常")
})
