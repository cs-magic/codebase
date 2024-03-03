"use client"
import { QueryConfigsComp } from "@/components/apps"
import { useEffect } from "react"
import { api } from "../../../../../packages/common/lib/trpc/react"
import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { useAtom } from "jotai"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"
import { convDetailAtom, convIdAtom, convsAtom } from "@/store/conv.atom"
import { useRouter } from "next/navigation"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const router = useRouter()

  const id = slug ? slug[0] : slug
  const [convs] = useAtom(convsAtom)
  const [convId] = useAtom(convIdAtom)
  const [, setConvDetail] = useAtom(convDetailAtom)
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)

  // 2. 检查服务端是否id有效
  const { isError, data: convInDB } = api.queryLLM.getQueryConv.useQuery(
    {
      id: id!,
    },
    { enabled: !!id },
  )

  // 2.1 无效则跳转
  useEffect(() => {
    if (!isError) return
    openAlertDialog("没有此会话！")
    setConvDetail(null)
  }, [isError])

  // 2.2 有效则更新详情数据
  useEffect(() => {
    if (convInDB) setConvDetail(convInDB)
  }, [convInDB])

  // 3. 当会话列表变动后（比如清除或者清空），如果命中了当前会话，则清除，可以涵盖单删或者多删
  useEffect(() => {
    if (convId && !convs.find((c) => c.id === convId)) {
      setConvDetail(null)
      console.log("-- clean conv since not existed now")
      if (id) router.push("/tt") // 如果不在列表页，还要退回去
    }
  }, [convs])

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <QueryConfigsComp />

      <QueryInChatLayout />
    </div>
  )
}
