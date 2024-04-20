import last from "lodash/last"
import { loadEnvServerSide } from "../../../common-env/utils/load-env-server-side"
import { sampleWxmpArticleUrls } from "../config"
import { fetchWxmpArticle } from "./fetch-wxmp-article"

loadEnvServerSide()

it("should fetched wxmp-article via simulator regardless of blocking", async () => {
  await fetchWxmpArticle(last(sampleWxmpArticleUrls)!, {
    withCache: false,
    detail: {
      request: {
        approachType: "simulate",
        backendType: "nodejs",
      },
      summary: {
        enabled: false,
        withImage: false,
        model: "gpt-3.5-turbo",
      },
    },
  })
}, 30e3)
