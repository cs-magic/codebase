"use client"
import { QueryConfigsComp } from "@/components/apps"
import { useEffect } from "react"
import { api } from "../../../../../packages/common/lib/trpc/react"
import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { useAtom } from "jotai"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"
import { useSearchParams } from "next/navigation"
import { convIdAtom, convsAtom } from "@/store/conv.atom"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const id = slug ? slug[0] : slug
  const hasFetched = useSearchParams().get("fetched")

  /**
   * 1. 更新 id
   */
  const [, setConvId] = useAtom(convIdAtom)
  useEffect(() => {
    setConvId(id ?? "")
  }, [id])

  /**
   * 2. 检查服务端是否id有效
   */
  const { isError, data: convInDB } = api.queryLLM.getQueryConv.useQuery(
    {
      id: id!,
    },
    { enabled: !!id && !hasFetched },
  )

  /**
   * 2. 无效则跳转
   */
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)
  useEffect(() => {
    if (isError) openAlertDialog("没有此会话！")
  }, [isError])

  /**
   * 2.2 有效则更新列表数据
   */
  const [, setConvs] = useAtom(convsAtom)
  useEffect(() => {
    if (convInDB) setConvs((cs) => cs.map((c) => (c.id === id ? convInDB : c)))
  }, [convInDB])

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <QueryConfigsComp />

      <QueryInChatLayout />
    </div>
  )
}
