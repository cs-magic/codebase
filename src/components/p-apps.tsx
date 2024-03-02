"use client"

import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { uiState } from "@/store/ui"

export const PAppsComp = () => {
  const { pApps } = useSnapshot(conversationStore)
  const { gridCols } = useSnapshot(uiState)
  console.log({ gridCols })

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
