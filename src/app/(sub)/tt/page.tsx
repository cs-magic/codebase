"use client"

import { useSnapshot } from "valtio"
import { conversationsState } from "@/store/conversation"
import { PAppsComp } from "@/components/p-apps"

export default function ConversationHomePage() {
  const { pApps } = useSnapshot(conversationsState)

  return <PAppsComp pApps={pApps} />
}
