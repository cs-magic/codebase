import { AxiosError } from "axios"
import logger from "../log"

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
