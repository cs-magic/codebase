import { formatDuration } from "@cs-magic/common/utils/format-duration"
import { promises } from "fs"
import jsYaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { type Message } from "wechaty"
import { type LangType } from "../../../packages/common-i18n/schema"
import { type IBotStaticContext, type IBotTemplate } from "../schema/bot"

import { getBotDynamicContext } from "./bot-context"
import { getConvPreference } from "./get-conv-preference"

export const loadBotTemplate = async (lang: LangType) => {
  return promises.readFile(
    path.join(
      fileURLToPath(import.meta.url),
      `../../config/template.${lang}.yml`,
    ),
    { encoding: "utf8" },
  )
}

export async function renderBotTemplate(
  message: Message,
  botContext: IBotStaticContext,
) {
  const preference = await getConvPreference(message)
  // console.log({ preference })

  const lang = preference.lang

  const botConfig = await getBotDynamicContext(lang)

  const template = await loadBotTemplate(lang)

  const templateString = Mustache.render(template, {
    preference,
    name: botConfig.name,
    title: `${botConfig.name} ${botContext.version}`,
    aliveTime: formatDuration((Date.now() - botContext.startTime) / 1e3),
  })

  const templateData = jsYaml.load(templateString, {}) as IBotTemplate

  return templateData
}
