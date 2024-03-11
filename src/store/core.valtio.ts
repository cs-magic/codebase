import { useAtom } from "jotai"
import { useEffect } from "react"
import { proxy } from "valtio"
import { CoreStore } from "../implementation/core-store"
import { convLogLevelAtom } from "./dev.atom"

/**
 * 为什么选择 valtio, see: https://github.com/pmndrs/zustand/issues/483#issuecomment-1949486418
 */
export const coreValtio = proxy(new CoreStore())

/**
 * 从 atom 中拿变量
 */
export const useInitCoreValtio = () => {
  const [convLogLevel] = useAtom(convLogLevelAtom)

  useEffect(() => {
    coreValtio.logLevel = convLogLevel
  }, [convLogLevel])
}
