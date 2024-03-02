"use client"

import { PAppsComp } from "@/components/p-apps"
import { useEffect } from "react"
import { conversationStore } from "@/store/conversation"

export default function ConversationHomePage() {
  useEffect(() => {
    conversationStore.currentConversationId = null
  }, [])

  return <PAppsComp />
}
