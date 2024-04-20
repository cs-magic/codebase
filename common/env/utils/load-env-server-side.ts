import dotenv from "dotenv"
import { Path } from "../../path"
import { getEnv } from "../index"

export const loadEnvServerSide = () => {
  // logger.info(`-- loading env from file://${path}`)
  dotenv.config({ path: Path.envFile, override: true })
  dotenv.config({ path: Path.envLocalFile, override: true })

  return getEnv()
}
