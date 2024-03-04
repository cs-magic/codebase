"use client"

import { AppComp } from "@/components/app"
import { cn } from "../../packages/common/lib/utils"
import { useAtom } from "jotai"

import { uiMainAreaAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import { persistedAppsAtom } from "@/store/app.atom"

export const QueryConfigsComp = () => {
  const [persistedApps] = useAtom(persistedAppsAtom)
  const [mainArea] = useAtom(uiMainAreaAtom)
  const { width } = mainArea
  const gridCols = Math.min(
    Math.floor(width / BEST_VIEWPOINT),
    persistedApps.length,
  )

  return (
    <div
      className={cn("w-full h-full overflow-hidden grid")}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
    >
      {persistedApps.map((app) => (
        <AppComp app={app} key={app.id} />
      ))}
    </div>
  )
}
