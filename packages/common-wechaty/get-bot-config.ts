import { promises } from "fs"
import yaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { prettyDuration } from "../common-common/pretty-duration"
import { botContext, IBotContext } from "./schema"

export const getBotConfig = async (config?: Partial<IBotContext>) => {
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

  return yaml.load(config_) as {
    help: string
    shelp: string
    status: string
  }
}
