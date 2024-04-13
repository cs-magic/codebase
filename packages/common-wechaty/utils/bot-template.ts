import { LangType } from "@/schema/wechat-user"
import { promises } from "fs"
import jsYaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { Message } from "wechaty"
import { prettyDuration } from "../../common-common/pretty-duration"
import { botStaticContext } from "../create-wechaty-bot"
import { IBotTemplate } from "../schema"

import { loadBotDynamicContext } from "./bot-context"
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

export async function renderBotTemplate(message: Message) {
  const preference = await getConvPreference(message)
  console.log({ preference })

  const lang = preference.lang

  const botConfig = await loadBotDynamicContext(lang)

  const template = await loadBotTemplate(lang)

  const templateString = Mustache.render(template, {
    preference,
    title: `${botConfig.name} ${botStaticContext.version}`,
    aliveTime: prettyDuration((Date.now() - botStaticContext.startTime) / 1e3),
  })

  const templateData = jsYaml.load(templateString, {}) as IBotTemplate

  return templateData
}
