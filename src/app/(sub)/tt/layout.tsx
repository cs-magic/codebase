"use client"
import { Sidebar } from "@/components/layout/sidebar"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"
import { useAtom } from "jotai"
import { api } from "../../../../packages/common/lib/trpc/react"
import { convsAtom, latestRequestAtom } from "@/store/conv.atom"
import { persistedAppsAtom } from "@/store/app.atom"
import { userQueryAtom } from "../../../../packages/common/store/user"
import { useQueryInChat } from "@/hooks/use-query-conv"

export default function ConversationLayout({ children }: PropsWithChildren) {
  /**
   * 1. 获取列表数据（一次）
   */
  const [, setConvs] = useAtom(convsAtom)
  const { data: convs } = api.queryLLM.listConv.useQuery()
  useEffect(() => {
    if (!convs) return
    // merge list-view convs with detail-view convs
    setConvs((old) =>
      convs.map((c) => {
        const o = old.find((o) => o.id === c.id)
        if (o) return { ...c, ...o }
        return c
      }),
    )
  }, [convs])

  /**
   * 2. 当 conv 更新后，用 conv 里的 config 覆盖本地的 config （监听）
   */
  const [latestRequest] = useAtom(latestRequestAtom)
  const [, setPersistedApps] = useAtom(persistedAppsAtom)
  useEffect(() => {
    if (latestRequest?.responses)
      setPersistedApps(latestRequest.responses.map((r) => r.app))
  }, [latestRequest])

  /**
   * 3. 如果本地有conv，且有用户输入的话，则自动触发一次会话请求 （监听）
   */
  const [conv] = useAtom(convsAtom)
  const [query] = useAtom(userQueryAtom)
  const queryInChat = useQueryInChat()
  useEffect(() => {
    if (conv && query) queryInChat() // 用户带着问题来的
  }, [conv])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
