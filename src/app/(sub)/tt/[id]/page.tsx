"use client"

import { useEffect } from "react"
import { PAppsComp } from "@/components/p-apps"
import { conversationStore } from "@/store/conversation-v2"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  useEffect(() => {
    conversationStore.state.currentConversationId = id
  }, [])

  return <PAppsComp />
}
