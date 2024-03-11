"use client"

import { useAtom } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { useSnapshot } from "valtio"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { uiScreenAtom } from "../../packages/common-ui/store"

import { appStopGeneratingScopeAtom } from "../store/system.atom"

import { coreValtio } from "../store/core.valtio"
import { getAppsGridCols } from "../utils"
import { ConvApp } from "./conv-app"

export const ConvApps = () => {
  // const [gridCols] = useAtom(getAppsGridColsAtom)
  // const apps = useConvStore.use.apps()
  // useSnapshot(convStore)

  const [{ width }] = useAtom(uiScreenAtom)
  const { apps } = useSnapshot(coreValtio)

  console.log({ apps })

  return (
    <div
      className={cn(
        "w-full grow overflow-hidden grid",
        //  自动均分行高：https://chat.openai.com/c/3c92ed30-59a9-42e1-8740-49710fca05ca
        "auto-rows-fr",
      )}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${getAppsGridCols(width, apps.length)}, minmax(0, 1fr))`,
      }}
    >
      {apps.map((app, index) => (
        // 不要用app.id会重复！
        <ScopeProvider key={index} atoms={[appStopGeneratingScopeAtom]}>
          <ConvApp app={app} />
        </ScopeProvider>
      ))}
    </div>
  )
}
