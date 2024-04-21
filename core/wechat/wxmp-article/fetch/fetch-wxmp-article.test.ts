import { loadEnvServerSide } from "../../../../packages/env/utils/load-env-server-side"
import { sampleWxmpArticleUrl } from "../config"
import { fetchWxmpArticle } from "./fetch-wxmp-article"

loadEnvServerSide()

it("should fetched wxmp-article via simulator regardless of blocking", async () => {
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
}, 30e3)
