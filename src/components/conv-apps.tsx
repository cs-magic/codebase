"use client"

import { appsGridColsAtom, appsPersistedAtom } from "@/store/app"
import { useAtom } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { cn } from "../../packages/common/lib/utils"
import { contextsAtom } from "../store/conv"
import { ConvApp } from "./conv-app"

export const ConvApps = () => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [contexts] = useAtom(contextsAtom)
  const [gridCols] = useAtom(appsGridColsAtom)

  return (
    <div
      className={cn("w-full h-full overflow-hidden grid")}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
    >
      {persistedApps?.map((app) => (
        <ScopeProvider key={app.id} atoms={[]}>
          <ConvApp app={app} key={app.id} context={contexts[app.id] ?? []} />
        </ScopeProvider>
      ))}
    </div>
  )
}
