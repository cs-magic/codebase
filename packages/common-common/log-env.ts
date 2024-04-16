import logger from "@cs-magic/log/logger"
import pickBy from "lodash/pickBy"

export const logEnv = (filter?: string) => {
  const data = pickBy(
    process.env,
    (v, k) => !filter || k.toLowerCase().includes(filter.toLowerCase()),
  )

  logger.info(`-- environment variables (filter=${filter}): `, data, "wwow", {
    a: 2,
  })
  // console.log(`-- environment variables (filter=${filter}): `, data, "wwow", {
  //   a: 2,
  // })
}
