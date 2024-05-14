import { logger } from "@cs-magic/log/logger"
import { AxiosError } from "axios"

export const formatError = (e: unknown) => {
  const s =
    e instanceof AxiosError
      ? JSON.stringify(e.response?.data)
      : e instanceof Error
        ? e.message
        : (e as string)
  logger.error(`❌ ${s}`)
  return s
}
