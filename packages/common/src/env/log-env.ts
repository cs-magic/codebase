import pickBy from "lodash/pickBy.js"

import { logger } from "../log/index.js"

export const logEnv = (filter?: string) => {
  const data = pickBy(
    process.env,
    (v, k) => !filter || k.toLowerCase().includes(filter.toLowerCase()),
  )

  logger.info(`-- environment variables (filter=${filter}): %o`, data)
}
