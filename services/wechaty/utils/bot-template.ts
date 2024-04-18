import { formatDuration } from "@cs-magic/common/utils/format-duration"
import { promises } from "fs"
import jsYaml from "js-yaml"
import Mustache from "mustache"
import path from "path"
import { fileURLToPath } from "url"
import { type Message } from "wechaty"
import { type LangType } from "../../../packages/common-i18n/schema"
import { type IBotStaticContext, type IBotTemplate } from "../schema/bot"
import { IWechatUserPreference } from "../schema/wechat-user"
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

export async function getBotTemplate(
  message: Message,
  botContext: IBotStaticContext,
) {
  const preference = await getConvPreference({
    isRoom: !!message.room(),
    convId: message.conversation().id,
  })
  return renderTemplate(preference, botContext)
}

export async function renderTemplate(
  preference: IWechatUserPreference,
  botContext: IBotStaticContext,
): Promise<IBotTemplate> {
  // logger.info({ preference })

  const lang = preference.lang

  const templateRaw = await loadBotTemplate(lang)

  // todo: avoid another load
  const templateData1 = jsYaml.load(templateRaw, {}) as IBotTemplate
  const name = templateData1.name

  const templateSlugged = Mustache.render(templateRaw, {
    preference,
    name,
    version: botContext.version,
    title: `${name} ${botContext.version}`,
    aliveTime: formatDuration((Date.now() - botContext.startTime) / 1e3),
  })

  const templateData = jsYaml.load(templateSlugged, {}) as IBotTemplate

  return templateData
}
