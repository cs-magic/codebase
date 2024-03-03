"use client"
import { Sidebar } from "@/components/layout/sidebar"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"
import { useAtom } from "jotai"
import { api } from "../../../../packages/common/lib/trpc/react"
import { convsAtom, latestQueryAtom } from "@/store/conv.atom"
import { persistedAppsAtom } from "@/store/app.atom"

export default function ConversationLayout({ children }: PropsWithChildren) {
  const [, setConvs] = useAtom(convsAtom)
  const { data: convs } = api.queryLLM.listQueryConv.useQuery()
  useEffect(() => {
    if (convs) setConvs(convs)
  }, [convs])

  /**
   * 当 conv 更新后，用 conv 里的 config 覆盖本地的 config
   */
  const [latestQuery] = useAtom(latestQueryAtom)
  const [, setPersistedQueryConfigs] = useAtom(persistedAppsAtom)
  useEffect(() => {
    if (latestQuery)
      setPersistedQueryConfigs(latestQuery.responses.map((r) => r.config))
  }, [latestQuery])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
