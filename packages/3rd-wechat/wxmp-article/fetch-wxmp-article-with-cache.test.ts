"use server"

import { promises } from "fs"
import path from "path"
import { generatedPath } from "../../../packages/common-common/path"
import { LlmModelType } from "../../../packages/common-llm/schema/providers"
import { fetchWxmpArticleWithCache } from "./fetch-wxmp-article-with-cache"

const url = process.argv[2]!
const model = process.argv[3]! as LlmModelType
console.log({ url, summaryModel: model })

const f = async () => {
  const result = await fetchWxmpArticleWithCache(url, {
    summaryModel: model,
  })

  const fp = path.join(generatedPath, `wxmp-article-${Date.now()}.json`)
  await promises.writeFile(fp, JSON.stringify(result, null, 2))
  console.log(`-- dumped into file://${fp}`)
}

void f()
