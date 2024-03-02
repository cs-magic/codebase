"use client"

import { api } from "@/lib/trpc/react"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { conversationsState } from "@/store/conversation"
import { PAppsComp } from "@/components/p-apps"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: conversation } = api.llm.getConversations.useQuery({
    conversationId: id,
  })
  useEffect(() => {
    if (conversation) {
      // pessimistic update
      conversationsState.conversationId = id
      conversationsState.pApps = conversation.pApps
    }
  }, [conversation])

  const { pApps } = useSnapshot(conversationsState)

  return <PAppsComp pApps={pApps} />
}
