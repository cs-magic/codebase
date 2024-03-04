"use client"

import { PropsWithChildren, useEffect } from "react"
import { api } from "../../packages/common/lib/trpc/react"
import { useAtom } from "jotai"

import { allAppsAtom } from "@/store/app.atom"
import { useAtomsDevtools } from "jotai-devtools"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function AppsProvider({ children }: PropsWithChildren) {
  const { data: apps } = api.queryLLM.listApps.useQuery()
  const [, setAllApps] = useAtom(allAppsAtom)

  useEffect(() => {
    if (apps) setAllApps(apps)
  }, [apps])

  // useAtomDevtools()
  useAtomsDevtools("demo")

  return (
    <>
      {/*<DevTools />*/}

      {children}
    </>
  )
}
