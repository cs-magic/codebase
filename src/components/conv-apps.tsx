"use client"

import { useAtom, useAtomValue } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { getAppsGridColsAtom, stopGeneratingAtom } from "../store/app.atom"
import { convAtomStore } from "../store/conv.store"
import { ConvApp } from "./conv-app"

export const ConvApps = () => {
  const [gridCols] = useAtom(getAppsGridColsAtom)

  // const apps = useConvStore.use.apps()
  const { apps } = useAtomValue(convAtomStore)
  // useSnapshot(convStore)

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
        gridTemplateColumns: `repeat(${gridCols(apps.length)}, minmax(0, 1fr))`,
      }}
    >
      {apps.map((app, index) => (
        // 不要用app.id会重复！
        <ScopeProvider key={index} atoms={[stopGeneratingAtom]}>
          <ConvApp app={app} />
        </ScopeProvider>
      ))}
    </div>
  )
}
