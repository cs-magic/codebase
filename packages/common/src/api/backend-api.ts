import { env } from "@cs-magic/env"
import logger from "../log"

import { createHttpInstance } from "./core"

const baseURL = env?.NEXT_PUBLIC_BACKEND_URL
logger.info(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
