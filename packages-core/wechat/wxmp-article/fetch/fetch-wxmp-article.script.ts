import { sampleWxmpArticleUrl } from "@cs-magic/p01-common/sample"
import { fetchWxmpArticle } from "./fetch-wxmp-article"

export const runFetchWxmpArticle = async () => {
  await fetchWxmpArticle(sampleWxmpArticleUrl, {
    withCache: false,
    detail: {
      request: {
        backendType: "nodejs",
        approach: {
          headless: false,
          type: "simulate",
        },
      },
      summary: {
        enabled: false,
        withImage: false,
        model: "gpt-3.5-turbo",
      },
    },
  })
}

void runFetchWxmpArticle()
