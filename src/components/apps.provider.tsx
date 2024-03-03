"use client"

import { PropsWithChildren, useEffect } from "react"
import { api } from "../../packages/common/lib/trpc/react"
import { useAtom } from "jotai"

import { allAppsAtom } from "@/store/app.atom"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function AppsProvider({ children }: PropsWithChildren) {
  const { data: queryConfigs } = api.queryLLM.listQueryConfigs.useQuery()
  const [, setQueryConfigs] = useAtom(allAppsAtom)

  useEffect(() => {
    if (!queryConfigs) return
    setQueryConfigs(queryConfigs)
  }, [queryConfigs])

  return <>{children}</>
}
