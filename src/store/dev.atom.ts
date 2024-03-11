import { atomWithStorage } from "jotai/utils"
import { LogLevel } from "../../packages/common-log/schema"

/**
 * conv 的 log 级别
 */
export const convLogLevelAtom = atomWithStorage<LogLevel>(
  "conv.log.level",
  LogLevel.info,
)
