import dotenv from "dotenv"
import { Path } from "../../common-path"

export const loadEnv = () => {
  const path = Path.envFile
  // logger.info(`-- loading env from file://${path}`)
  dotenv.config({ path, override: true })
}
