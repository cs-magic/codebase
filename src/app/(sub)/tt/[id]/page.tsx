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
    if (!valid) return console.log("skip update since invalid")
    // optimistic
    console.log(
      `update id(${conversationStore.currentConversationId} --> ${id})`,
    )
    conversationStore.currentConversationId = id

    // ensure id valid
    if (!conversations.find((c) => c.id === id)) router.push("/tt")
  }, [conversations, valid])

  console.log({ id, valid, conversations })

  return <PAppsComp />
}
