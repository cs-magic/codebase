"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"

import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { api } from "@/lib/trpc/react"
import { conversationStore } from "@/store/conversation"

const ChatLayout = ({ children }: PropsWithChildren) => {
  // 只能运行一次，不要有其他hook
  const { data: conversations } = api.llm.listConversations.useQuery()

  // 确保只运行一次
  useEffect(() => {
    if (conversations)
      conversationStore.conversations = conversations.map((c) => ({
        ...c,
        messageSnapshots: [],
        selectedPAppId: c.pApps[0]!.id,
      }))
  }, [conversations])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full flex flex-col "}>
        {children}

        <QueryInChatLayout />
      </div>
    </div>
  )
}
export default ChatLayout
