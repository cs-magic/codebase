import { config } from "@/config/system"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { fileURLToPath } from "url"

import { BackendEngineType } from "../common-llm/schema/llm"
import { LlmModelType } from "../common-llm/schema/providers"

export type IBotPreference = {
  model: LlmModelType
  backendEngineType: BackendEngineType
}

export type IBotContext = {
  name: string
  version: string
  startTime: number
} & IBotPreference

export const loadBotContext = async (): Promise<IBotContext> => {
  const _g: {
    context: IBotContext | null
  } = {
    context: null,
  }
  const preferenceFilePath = path.join(
    fileURLToPath(import.meta.url),
    "../preference.yml",
  )

  if (!_g.context) {
    console.log("-- loading bot context from fs")
    const context = await promises.readFile(preferenceFilePath, {
      encoding: "utf-8",
    })

    const preference = yaml.load(context) as IBotPreference

    _g.context = {
      ...preference,
      name: "小川助手",
      version: config.version,
      startTime: Date.now(),
    }
  } else {
    console.log("-- loading bot context from cache")
  }

  process.on("beforeExit", async () => {
    if (_g.context) {
      console.log("-- dumping bot context")
      await promises.writeFile(preferenceFilePath, yaml.dump(_g.context))
    }
    console.log("-- dumped")
  })

  return _g.context
}

export type IBotTemplate = {
  help: string
  shelp: string
  status: string
}
