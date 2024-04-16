"use server"

import { promises } from "fs"
import path from "path"
import { LlmModelType } from "../../common-llm/schema/providers"
import { Path } from "../../common-path"
import { fetchWxmpArticleWithCache } from "./fetch-wxmp-article-with-cache"

const url =
  process.argv[2]! ?? "https://mp.weixin.qq.com/s/RNTQX1yPoTXCRO198cwQcA"
const model = (process.argv[3] ?? "gpt-3.5-turbo") as LlmModelType
console.log({ url, summaryModel: model })

const f = async () => {
  const result = await fetchWxmpArticleWithCache(url, {
    summaryModel: model,
  })

  const fp = path.join(Path.generatedDir, `wxmp-article-${Date.now()}.json`)
  await promises.writeFile(fp, JSON.stringify(result, null, 2))
  console.log(`-- dumped into file://${fp}`)
}

void f()
