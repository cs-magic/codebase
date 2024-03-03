"use client"
import { QueryConfigsComp } from "@/components/apps"
import { useEffect } from "react"
import { api } from "../../../../../packages/common/lib/trpc/react"
import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { useAtom } from "jotai"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"
import { useSearchParams } from "next/navigation"
import { convAtom, convIdAtom } from "@/store/conv.atom"
import { userQueryAtom } from "../../../../../packages/common/store/user"
import { useQueryInChat } from "@/hooks/use-query-conv"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const id = slug ? slug[0] : slug
  const hasFetched = useSearchParams().get("fetched")

  /**
   * 1. 检查服务端数据，并决定是否更新本地的conv
   */
  const { isError, data: convInDB } = api.queryLLM.getQueryConv.useQuery(
    {
      id: id!,
    },
    { enabled: !!id && !hasFetched },
  )
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)
  useEffect(() => {
    if (convInDB) setConvId(convInDB.id)
    if (isError) openAlertDialog("没有此会话！")
  }, [convInDB, isError])

  /**
   * 如果本地有conv，且有用户输入的话，则自动触发一次会话请求
   */
  const [convId, setConvId] = useAtom(convIdAtom)
  const [query] = useAtom(userQueryAtom)
  const queryInChat = useQueryInChat()
  useEffect(() => {
    if (convId && query) queryInChat() // 用户带着问题来的
  }, [convId])

  // console.log({ slug, id, convInDB, convId, query })

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <QueryConfigsComp />

      <QueryInChatLayout />
    </div>
  )
}
