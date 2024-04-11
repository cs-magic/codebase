import { parseWxmpArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { findWxmpArticle } from "./find-wxmp-article"

const f = async (url: string) => {
  const found = await findWxmpArticle(parseWxmpArticleUrl(url))
  console.log({ found })
}

void f(process.argv[2]!)
