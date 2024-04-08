import { prettyError } from "../../common-common/pretty-error"
import { fetchWxmpArticle } from "./fetch-wxmp-article"

it("should run wxmp article ok", async () => {
  const url =
    "http://mp.weixin.qq.com/s?__biz=MzI4NTgxMDk1NA==&amp;mid=2247490896&amp;idx=2&amp;sn=568f4c0a22313f5269f9fada94206ef4&amp;chksm=ebe7d535dc905c2308bdb321218da67ffe8a0fd3\n" +
    "2b63ef4bf6ecd706c43f86a12824dc329406&amp;mpshare=1&amp;scene=1&amp;srcid=0404tbqm2VUZRS72SUkVwq94&amp;sharer_shareinfo=481652bc83d18c4898309e7f413e6bae&amp;sharer_shareinfo_first=ae44e63fe8de9e05a5b6d5dfef67ce2c#rd"

  try {
    const result = await fetchWxmpArticle(url, {
      backendEngineType: "nodejs",
      // summary_model: "gpt-4",
      summaryModel: "gpt-3.5-turbo",
      // summary_model: "moonshot-v1-8k",
    })
    console.log({ result })
  } catch (err) {
    prettyError(err)
  }
}, 30e3)
