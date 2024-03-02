"use client"

import { PropsWithChildren, useEffect } from "react"
import { conversationStore } from "@/store/conversation"
import { api } from "@/lib/trpc/react"

export default function LlmProvider({ children }: PropsWithChildren) {
  const { data: pApps } = api.llm.listPApps.useQuery()

  useEffect(() => {
    if (pApps) {
      conversationStore.allPApps = pApps
      conversationStore.persistedPApps = pApps.filter((p) =>
        /gpt/.test(p.modelId),
      )
    }
  }, [pApps])

  const { data: conversations } = api.llm.listConversations.useQuery()
  useEffect(() => {
    if (conversations) conversationStore.conversations = conversations
  }, [conversations])

  console.log({ pApps, conversations })

  return <>{children}</>
}
