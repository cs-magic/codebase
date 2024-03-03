"use client"
import { PAppsComp } from "@/components/query-configs"
import { conversationStore } from "@/store/conversation.valtio"
import { useEffect } from "react"
import { api } from "@/api/react"
import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { useAtom } from "jotai"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const id = slug ? slug[0] : slug
  const { isError, data: conversation } = api.llm.getConversation.useQuery(
    {
      conversationId: id!,
    },
    { enabled: !!id },
  )

  const [, openAlertDialog] = useAtom(openAlertDialogAtom)

  useEffect(() => {
    if (conversation) conversationStore.conversation = conversation
    if (isError) openAlertDialog("没有此会话！")
  }, [conversation, isError])

  // console.log({ isSuccess, isError })
  console.log({ slug, id })

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <PAppsComp />

      <QueryInChatLayout />
    </div>
  )
}
