"use client"

import {
  appsGridColsAtom,
  appsPersistedAtom,
  stopGeneratingAtom,
} from "@/store/app"
import { useAtom } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { cn } from "../../packages/common/lib/utils"
import { ConvApp } from "./conv-app"

export const ConvApps = () => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [gridCols] = useAtom(appsGridColsAtom)

  // console.log({ persistedApps })

  return (
    <div
      className={cn(
        "w-full grow overflow-hidden grid",
        //  自动均分行高：https://chat.openai.com/c/3c92ed30-59a9-42e1-8740-49710fca05ca
        "auto-rows-fr",
      )}
      style={{
        // ref: https://tailwindcss.com/docs/grid-template-columns
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
    >
      {persistedApps?.map(
        // 同一个app-id是否可以多个呢？请求应该要额外小心处理！
        (app, index) => (
          <ScopeProvider key={index} atoms={[stopGeneratingAtom]}>
            <ConvApp app={app} />
          </ScopeProvider>
        ),
      )}
    </div>
  )
}
