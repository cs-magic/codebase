import { logger } from "@cs-magic/log/logger"
import pickBy from "lodash/pickBy"
import { env } from ".."

export const logEnv = (filter?: string) => {
  const data = pickBy(
    env,
    (v, k) => !filter || k.toLowerCase().includes(filter.toLowerCase()),
  )

  logger.info(`-- environment variables (filter=${filter}): %o`, data)
}
