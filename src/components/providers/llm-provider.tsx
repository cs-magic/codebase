"use client"

import { PropsWithChildren, useEffect } from "react"
import { api } from "../../../packages/common/lib/trpc/react"
import { useAtom } from "jotai"

import { allQueryConfigsAtom } from "@/store/query-config.atom"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function LlmProvider({ children }: PropsWithChildren) {
  const { data: queryConfigs } = api.queryLLM.listQueryConfigs.useQuery()
  const [, setQueryConfigs] = useAtom(allQueryConfigsAtom)

  useEffect(() => {
    if (!queryConfigs) return
    setQueryConfigs(queryConfigs)
  }, [queryConfigs])

  return <>{children}</>
}
