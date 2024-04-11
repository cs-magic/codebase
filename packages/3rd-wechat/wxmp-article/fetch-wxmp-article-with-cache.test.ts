"use server"

import { LlmModelType } from "../../common-llm/schema/providers"
import { fetchWxmpArticleWithCache } from "./fetch-wxmp-article-with-cache"

const url = process.argv[2]!
const summaryModel = process.argv[3]! as LlmModelType
console.log({ url, summaryModel })

void fetchWxmpArticleWithCache(url, {
  summaryModel,
})
