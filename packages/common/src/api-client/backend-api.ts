import { env } from "../env/index.js"
import { logger } from "../log/index.js"
import { createHttpInstance } from "./core.js"

const baseURL = env.NEXT_PUBLIC_BACKEND_URL
logger.info(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
