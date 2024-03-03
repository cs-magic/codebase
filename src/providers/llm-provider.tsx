"use client"

import { PropsWithChildren, useEffect } from "react"
import { conversationStore } from "@/store/conversation"
import { api } from "@/lib/trpc/react"
import { useSession } from "next-auth/react"

export default function LlmProvider({ children }: PropsWithChildren) {
  const { data: apps } = api.llm.listApps.useQuery()

  useEffect(() => {
    if (apps) {
      conversationStore.allApps = apps
      conversationStore.apps = apps.filter((p) => /gpt/.test(p.modelId))
    }
  }, [apps])

  const session = useSession()
  const { data: conversations } = api.llm.listConversations.useQuery(
    undefined,
    {
      enabled: session.status === "authenticated",
    },
  )
  useEffect(() => {
    if (conversations) conversationStore.conversations = conversations
  }, [conversations])

  console.log({ apps, conversations })

  return <>{children}</>
}
