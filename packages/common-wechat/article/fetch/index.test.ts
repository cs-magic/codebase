import { promises } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { wechatArticleUrlSample } from "./config"
import { fetchWechatArticle } from "./index"

it("fetch wechat article", async () => {
  const data = await fetchWechatArticle(wechatArticleUrlSample)
  const dir = path.resolve(fileURLToPath(import.meta.url), "../__generated")
  await promises.mkdir(dir, { recursive: true })
  await promises.writeFile(
    path.join(dir, "article.json"),
    JSON.stringify(data, null, 2),
  )
})
