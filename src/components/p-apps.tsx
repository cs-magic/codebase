"use client"

import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"
import { useMeasure } from "react-use"
import { cn } from "@/lib/utils"
import { BEST_VIEWPOINT } from "@/config/system"
import { useEffect } from "react"
import { uiState } from "@/store/ui"

export const PAppsComp = () => {
  const { pApps } = useSnapshot(conversationStore)
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    uiState.mainArea = { width, height }
    console.log({ width, height })
  }, [width, height])

  return (
    <div
      className={cn("w-full h-full overflow-hidden grid")}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${Math.min(Math.floor(width / BEST_VIEWPOINT), pApps.length)}, minmax(0, 1fr))`,
      }}
      ref={ref}
    >
      {pApps.map((pApp) => (
        <PAppComp pApp={pApp} key={pApp.id} />
      ))}
    </div>
  )
}
