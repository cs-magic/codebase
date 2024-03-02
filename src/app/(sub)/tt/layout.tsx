"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"

import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { api } from "@/lib/trpc/react"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"

const ChatLayout = ({ children }: PropsWithChildren) => {
  // 只能运行一次，不要有其他hook
  const { data: conversations } = api.llm.listConversations.useQuery()
  const { conversations: localConversations } = useSnapshot(conversationStore)

  // 确保只运行一次
  useEffect(() => {
    if (!conversations) return
    conversations.forEach((c) => {
      const localConversation = localConversations.find((lc) => lc.id === c.id)
      if (!localConversation)
        conversationStore.conversations.push({
          ...c,
          // todo: local align
          messageSnapshots: [],
        })
      else {
        // 本地数据更多，无需对齐
      }
    })
  }, [conversations])

  useEffect(() => {
    return () => {
      conversationStore.currentConversationId = null
    }
  }, [])

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
