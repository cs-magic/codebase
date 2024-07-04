import { logger } from "../log"
import { env } from "../env"
import { createHttpInstance } from "./core"

const baseURL = env.NEXT_PUBLIC_BACKEND_URL
logger.info(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
