import { env } from "@cs-magic/env"
import logger from "../log/index.js"

import { createHttpInstance } from "./core.js"

const baseURL = env?.NEXT_PUBLIC_BACKEND_URL
// logger.debug(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
