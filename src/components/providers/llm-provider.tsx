"use client"

import { PropsWithChildren, useEffect } from "react"
import { api } from "@/lib/trpc/react"
import { useAtom } from "jotai"

import { queryConfigsAtom } from "@/core/query-llm/store/query-config.atom"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function LlmProvider({ children }: PropsWithChildren) {
  const { data: queryConfigs } = api.queryLLM.listQueryConfigs.useQuery()
  const [, setQueryConfigs] = useAtom(queryConfigsAtom)

  useEffect(() => {
    if (!queryConfigs) return
    setQueryConfigs(queryConfigs)
  }, [queryConfigs])

  return <>{children}</>
}
