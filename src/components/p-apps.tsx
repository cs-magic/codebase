"use client"

import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { uiState } from "@/store/ui"
import { BEST_VIEWPOINT } from "@/config/system"

export const PAppsComp = () => {
  const { apps } = useSnapshot(conversationStore)
  const {
    mainArea: { width },
  } = useSnapshot(uiState)
  const cnt = conversationStore.apps.length
  const gridCols = Math.min(Math.floor(width / BEST_VIEWPOINT), cnt)

  return (
    <div
      className={cn("w-full h-full overflow-hidden grid")}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
    >
      {apps.map((app) => (
        <PAppComp app={app} key={app.id} />
      ))}
    </div>
  )
}
