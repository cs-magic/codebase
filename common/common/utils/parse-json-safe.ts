import { logger } from "@cs-magic/log/logger"
import { parseJs } from "./parse-json"

export const parseJsonSafe = <T>(s?: any): T | null => {
  logger.debug("parseJsonSafe: %o", s)

  if (!s) return null
  if (typeof s === "object") return s as T

  try {
    if (typeof s === "string" && s.startsWith('"'))
      return parseJsonSafe(JSON.parse(s))
    return parseJsonSafe(parseJs<T>(s as string))
  } catch (e) {
    return null
  }
}
