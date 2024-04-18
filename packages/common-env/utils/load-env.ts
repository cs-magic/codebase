import dotenv from "dotenv"
import { Path } from "../../common-path"
import { getEnv } from "../index"

/**
 * @deprecated 不建议使用，推荐在package.json 里使用 source .env
 * 加载并返回环境变量
 * 返回的原因是因为不能在 browser 端使用
 */
export const loadEnv = () => {
  // logger.info(`-- loading env from file://${path}`)
  dotenv.config({ path: Path.envFile, override: true })
  dotenv.config({ path: Path.envLocalFile, override: true })

  return getEnv()
}
