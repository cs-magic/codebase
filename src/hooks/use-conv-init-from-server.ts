import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { LogLevel } from "../../packages/common-log/schema"
import { api } from "../../packages/common-trpc/react"
import { openAlertDialogAtom } from "../../packages/common-ui/store"
import { coreStore } from "../store/core.valtio"
import { convLogLevelAtom } from "../store/dev.atom"
import { useSnapshot } from "valtio"

export const useConvInitFromServer = (
  convIdInUrl: string | undefined,
  reqIdInUrl: string | null,
) => {
  const [convLogLevel] = useAtom(convLogLevelAtom)

  const openAlertDialog = useSetAtom(openAlertDialogAtom)

  const { convId } = useSnapshot(coreStore)

  // 1. 检查服务端是否id有效
  const { isError, data: convFromServer } = api.core.getConv.useQuery(
    {
      id: convIdInUrl!,
    },
    {
      enabled:
        // 初始化的时候
        !!convIdInUrl && !convId,
    },
  )

  /**
   * conv 逻辑
   * ~~无脑对齐即可，就是个 context 作用~~
   * ~~由于conv基于requestId会拉多次，所以只要第一次就可以~~
   * 避免多次刷新！重要！
   */
  useEffect(() => {
    const skip = !convFromServer

    if (skip) {
      if (convLogLevel <= LogLevel.debug)
        console.log(`setting conv since fetched (skipped)`)
      return
    }

    if (convLogLevel <= LogLevel.info)
      console.log("setting conv since fetched: ", {
        conv: {
          cur: convIdInUrl,
          new: convFromServer?.id,
        },
        req: {
          cur: reqIdInUrl,
          new: convFromServer.currentRequestId,
        },
      })

    coreStore.initConvFromServer(convFromServer)
  }, [convFromServer])

  // 2. 无效则跳转
  useEffect(() => {
    if (!isError) return
    openAlertDialog("没有此会话！")
  }, [isError])

  console.log("useConvFromServer: ", { isError, convFromServer })
}
