"use client"

import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { uiState } from "@/store/ui"
import { BEST_VIEWPOINT } from "@/config/system"

export const PAppsComp = () => {
  const { pApps } = useSnapshot(conversationStore)
  const {
    mainArea: { width },
  } = useSnapshot(uiState)
  const cnt = conversationStore.pApps.length
  const gridCols = Math.min(Math.floor(width / BEST_VIEWPOINT), cnt)

  return (
    <div
      className={cn("w-full h-full overflow-hidden grid")}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
    >
      {pApps.map((pApp) => (
        <PAppComp pApp={pApp} key={pApp.id} />
      ))}
    </div>
  )
}
