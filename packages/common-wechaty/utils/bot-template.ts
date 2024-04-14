import { promises } from "fs"
import jsYaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { Message } from "wechaty"
import { prettyDuration } from "../../common-common/pretty-duration"
import { LangType } from "../../common-i18n/schema"
import { IBotStaticContext, IBotTemplate } from "../schema"

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
  console.log({ preference })

  const lang = preference.lang

  const botConfig = await getBotDynamicContext(lang)

  const template = await loadBotTemplate(lang)

  const templateString = Mustache.render(template, {
    preference,
    name: botConfig.name,
    title: `${botConfig.name} ${botContext.version}`,
    aliveTime: prettyDuration((Date.now() - botContext.startTime) / 1e3),
  })

  const templateData = jsYaml.load(templateString, {}) as IBotTemplate

  return templateData
}
