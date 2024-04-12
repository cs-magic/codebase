import { config } from "@/config/system"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { fileURLToPath } from "url"
import { IBotContext, IBotPreference } from "../schema"

export const loadBotContext = async (): Promise<IBotContext> => {
  const _g: {
    context: IBotContext | null
  } = {
    context: null,
  }
  const preferenceFilePath = path.join(
    fileURLToPath(import.meta.url),
    "../config/preference.yml",
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
