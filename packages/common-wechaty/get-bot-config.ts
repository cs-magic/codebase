import { promises } from "fs"
import jsYaml from "js-yaml"
import yaml from "yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { prettyDuration } from "../common-common/pretty-duration"
import { botContext, IBotConfig, IBotContext } from "./schema"

export const getBotConfig = async (
  config?: Partial<IBotContext>,
  yamlParser: "js-yaml" | "yaml" = "js-yaml",
) => {
  const __filename = fileURLToPath(import.meta.url)

  const template = await promises.readFile(
    path.join(__filename, "../template.yml"),
    { encoding: "utf-8" },
  )
  const config_ = Mustache.render(template, {
    ...botContext,
    ...config,
    aliveTime: prettyDuration((Date.now() - botContext.startTime) / 1e3),
  })

  switch (yamlParser) {
    case "js-yaml":
      return jsYaml.load(config_, {}) as IBotConfig

    case "yaml":
    default:
      return yaml.parse(config_) as unknown as IBotConfig
  }
}
