import path from "path"
import { fetchWxmpArticle } from "../packages/3rd-wechat/wxmp-article/fetch-wxmp-article"
import { dumpJSON } from "../packages/common-common/dump-json"
import { generatedPath } from "../packages/common-common/path"
import { prettyError } from "../packages/common-common/pretty-error"
import { LLMModelType } from "../packages/common-llm/schema/providers"

export const compareModels = async (url?: string) => {
  if (!url) throw new Error("no url found")

  const models: LLMModelType[] = [
    "gpt-3.5-turbo",
    "gpt-4",
    "glm-4",
    "moonshot-v1-8k",
    "Baichuan2-Turbo",
    "qwen-turbo",
    "qwen-plus",
    "qwen-max",
  ]

  const dir = path.join(generatedPath, Date.now().toString())

  for (const model of models) {
    try {
      const result = await fetchWxmpArticle(url, {
        backendEngineType: "nodejs",
        summaryModel: model,
      })

      await dumpJSON(result, `wxmp-article.sample.${Date.now()}.json`, dir)
    } catch (err) {
      prettyError(err)
    }
  }
}

void compareModels(process.argv[2])
