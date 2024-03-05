"use client"

import { contextsAtom } from "../store/conv"
import { ConvApp } from "./conv-app"

import { appsGridColsAtom, appsPersistedAtom, appStore } from "@/store/app"
import { Provider, useAtom } from "jotai"
import { cn } from "../../packages/common/lib/utils"

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
        // <Provider store={appStore} key={app.id}>
        <ConvApp app={app} key={app.id} context={contexts[app.id] ?? []} />
        // </Provider>
      ))}
    </div>
  )
}
