import { atomWithStorage } from "jotai/utils"
import { LogLevel } from "../../packages/common-log/schema"
import { atom } from "jotai"
import { coreStore } from "./core.valtio"
import ansiColors from "ansi-colors"

/**
 * conv 的 log 级别
 */
export const convLogLevelBaseAtom = atomWithStorage<LogLevel>(
  "conv.log.level",
  LogLevel.info,
)

export const convLogLevelAtom = atom(
  (get) => get(convLogLevelBaseAtom),
  (get, set, value: LogLevel) => {
    console.log(ansiColors.red(`-- setting valtio log level: `), value)
    coreStore.logLevel = value // 先更新valtio
    set(convLogLevelBaseAtom, value)
  },
)
