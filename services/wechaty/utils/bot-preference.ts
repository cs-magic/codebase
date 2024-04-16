import { logger } from "@cs-magic/log/logger"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { fileURLToPath } from "url"
import { type IBotPreference } from "../schema/bot"

const preferenceFilePath = path.join(
  fileURLToPath(import.meta.url),
  "../../config/preference.yml",
)

export const loadBotPreference = async () => {
  const content = await promises.readFile(preferenceFilePath, {
    encoding: "utf-8",
  })

  return yaml.load(content) as IBotPreference
}

export const dumpBotPreference = async (botPreference: IBotPreference) => {
  logger.info("-- dumping bot context")
  await promises.writeFile(preferenceFilePath, yaml.dump(botPreference))
}
