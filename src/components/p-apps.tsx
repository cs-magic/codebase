"use client"

import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation.valtio"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { BEST_VIEWPOINT } from "@/config/system"
import { useAtom } from "jotai"
import { uiMainAreaAtom } from "@/store/ui.atom"

export const PAppsComp = () => {
  const { apps } = useSnapshot(conversationStore)
  const [mainArea] = useAtom(uiMainAreaAtom)
  const { width } = mainArea
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
