"use client"

import { PropsWithChildren, useEffect } from "react"
import { conversationStore } from "@/store/conversation"
import { api } from "@/lib/trpc/react"

export default function LlmProvider({ children }: PropsWithChildren) {
  const { data: apps } = api.llm.listApps.useQuery()

  useEffect(() => {
    if (apps) {
      conversationStore.allApps = apps
      conversationStore.apps = apps.filter((p) => /gpt/.test(p.modelId))
    }
  }, [apps])

  console.log({ apps })

  return <>{children}</>
}
