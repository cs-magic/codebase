"use client"

import { PAppsComp } from "@/components/p-apps"
import { conversationStore } from "@/store/conversation"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { useRouter } from "next/navigation"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const router = useRouter()

  const { conversations, conversationsValid: valid } =
    useSnapshot(conversationStore)

  useEffect(() => {
    // optimistic
    conversationStore.currentConversationId = id

    // ensure id valid
    if (valid && !conversations.find((c) => c.id === id)) {
      router.push("/tt")
      conversationStore.currentConversationId = null
    }
  }, [id, conversations, valid])

  return <PAppsComp />
}
