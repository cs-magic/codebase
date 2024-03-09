import { useEffect } from "react"
import { api } from "../../packages/common-trpc/react"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { openAlertDialogAtom } from "../../packages/common-ui/store"
import { convAtom } from "../store/conv"

export const useConvFromServer = () => {
  const [conv, setConv] = useAtom(convAtom)
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)

  const id = conv?.id

  // 1. 检查服务端是否id有效
  const { isError, data: convFromServer } = api.core.getConv.useQuery(
    {
      id: id!,
    },
    { enabled: !!id },
  )

  /**
   * conv 逻辑
   * ~~无脑对齐即可，就是个 context 作用~~
   * ~~由于conv基于requestId会拉多次，所以只要第一次就可以~~
   * 避免多次刷新！重要！
   */
  useEffect(() => {
    const skip = !convFromServer

    if (skip) return console.log(`setting conv since fetched (skip=${skip})`)

    console.log(ansiColors.red(`setting conv since fetched (skip=${skip}): `), {
      id,
      serverId: convFromServer?.id,
    })
    setConv(convFromServer)
  }, [convFromServer])

  // 2. 无效则跳转
  useEffect(() => {
    if (!isError) return
    openAlertDialog("没有此会话！")
  }, [isError])
}
