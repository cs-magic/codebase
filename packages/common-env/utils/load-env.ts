import dotenv from "dotenv"
import { Path } from "../../common-path"

export const loadEnv = () => {
  // logger.info(`-- loading env from file://${path}`)
  dotenv.config({ path: Path.envFile, override: true })
  dotenv.config({ path: Path.envLocalFile, override: true })
}
