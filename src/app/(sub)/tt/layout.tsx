"use client"
import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"
import { useAtom } from "jotai"
import { api } from "@/lib/trpc/react"
import { queryConvsAtom } from "@/core/query-llm/store/query-conv.atom"

export default function ConversationLayout({ children }: PropsWithChildren) {
  const [, setConversations] = useAtom(queryConvsAtom)
  const { data: conversations } = api.llm.listConversations.useQuery()
  useEffect(() => {
    if (!conversations) return
    setConversations(conversations)
  }, [conversations])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
