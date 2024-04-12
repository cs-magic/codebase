import fs from "fs"
import jsYaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { prettyDuration } from "../../common-common/pretty-duration"
import { IBotContext, IBotTemplate } from "../schema"
import { wechatPadding } from "./wechat-padding"

export const loadBotTemplate = () => {
  return fs.readFileSync(
    path.join(fileURLToPath(import.meta.url), "../../config/template.yml"),
    { encoding: "utf8" },
  )
}

export const renderBotTemplate = (context: IBotContext) => {
  const template = loadBotTemplate()

  const prettyHandlers =
    "\n" +
    context.preference.handlers
      .map((v, i) =>
        wechatPadding(
          `${i + 1}. ${v}`,
          // padding logic: 1. Preference 2. handlers 3. handler
          3,
        ),
      )
      .join("\n")

  const templateString = Mustache.render(template, {
    ...context,
    title: `${context.name} ${context.version}`,
    aliveTime: prettyDuration((Date.now() - context.startTime) / 1e3),
    prettyHandlers,
  })
  const templateData = jsYaml.load(templateString, {}) as IBotTemplate

  console.log({ prettyHandlers, templateString, templateData })
  return templateData
}
