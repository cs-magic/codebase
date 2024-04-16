import logger from "@cs-magic/log/logger"
import dotenv from "dotenv"
import { Path } from "../common-path"

export const loadEnv = () => {
  const path = Path.envFile
  logger.log(`-- loading env from file://${path}`)
  dotenv.config({ path, override: true })
}
