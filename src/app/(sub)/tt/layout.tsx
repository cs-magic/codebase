"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"

import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { api } from "@/lib/trpc/react"
import { conversationStore } from "@/store/conversation"

const ChatLayout = ({ children }: PropsWithChildren) => {
  // 只能运行一次，不要有其他hook
  const { data: conversations = [], isFetched } =
    api.llm.listConversations.useQuery()

  // 确保只运行一次
  useEffect(() => {
    conversationStore.conversations = conversations
    conversationStore.conversationsValid = isFetched
  }, [isFetched, conversations])

  return (
    <div className={"w-full h-full overflow-auto flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col"}>
        {children}

        <QueryInChatLayout />
      </div>
    </div>
  )
}
export default ChatLayout
