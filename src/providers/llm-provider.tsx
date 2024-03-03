"use client"

import { PropsWithChildren, useEffect } from "react"
import { conversationStore } from "@/store/conversation.valtio"
import { api } from "@/lib/trpc/react"
import { useAtom } from "jotai"
import { appsAtom } from "@/store/conversation.atom"

export default function LlmProvider({ children }: PropsWithChildren) {
  // all apps persist in trpc cache, while user apps persist in store
  const { data: apps } = api.llm.listApps.useQuery()
  const [, setApps] = useAtom(appsAtom)

  useEffect(() => {
    console.log("-- apps: ", apps)
    if (!apps) return
    const filteredApps = apps.filter((p) => /gpt/.test(p.modelId))
    setApps(filteredApps)

    conversationStore.allApps = apps
    conversationStore.apps = filteredApps
  }, [apps])

  console.log({ apps })

  return <>{children}</>
}
