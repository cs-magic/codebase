"use client"
import { Sidebar } from "@/components/sidebar"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"
import { useAtom } from "jotai"
import { api } from "../../../../packages/common/lib/trpc/react"
import { convDetailAtom, convsAtom } from "@/store/conv.atom"
import { persistedAppsAtom, selectedAppIDAtom } from "@/store/app.atom"
import { userPromptAtom } from "../../../../packages/common/store/user"
import { useQueryInChat } from "@/hooks/use-conv-query"
import { convAppsAtom } from "@/store/request.atom"

export default function ConversationLayout({ children }: PropsWithChildren) {
  const { data: convsInDB } = api.queryLLM.listConv.useQuery()

  const [convs, setConvs] = useAtom(convsAtom)
  const [conv, setConv] = useAtom(convDetailAtom)
  const [persistedApps, setPersistedApps] = useAtom(persistedAppsAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(selectedAppIDAtom)
  const [query] = useAtom(userPromptAtom)
  const [convApps] = useAtom(convAppsAtom)

  const utils = api.useUtils()
  const queryInChat = useQueryInChat()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) setConvs(convsInDB)
  }, [convsInDB])

  // 2. 当 conv 更新后，用 conv 里的 app 覆盖本地的 app
  useEffect(() => {
    // 不能清空
    if (convApps.length) setPersistedApps(convApps)
  }, [convApps])

  // 3. 当有persisted app 但没有selected app时，自动选第一个
  useEffect(() => {
    if (!persistedApps.length) return
    if (
      // 没有
      !selectedAppID ||
      // 丢了
      !persistedApps.find((p) => p.id === selectedAppID)
    )
      setSelectedAppID(persistedApps[0]!.id)
  }, [persistedApps.length])

  // 4. 如果本地有conv，且有用户输入的话，则自动触发一次会话请求
  useEffect(() => {
    if (conv && query) queryInChat() // 用户带着问题来的
  }, [conv])

  // 5. 当离开会话的时候，置空
  useEffect(() => {
    return () => {
      setConv(null)
    }
  }, [])

  // 6. 当 conv 个数变化时，重置
  useEffect(() => {
    utils.queryLLM.listConv.invalidate()
  }, [convs.length])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
