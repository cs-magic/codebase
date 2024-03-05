"use client"
import {
  convDetailFromServerAtom,
  convIdAtom,
  convsFromServerAtom,
  requestIdAtom,
} from "@/store/conv"
import { useAtom } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { api } from "../../../../../packages/common/lib/trpc/react"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"
import { ConvApps } from "../../../../components/conv-apps"
import { ConvControl } from "../../../../components/conv-control"
import { ConvQuery } from "../../../../components/conv-query"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const [convs] = useAtom(convsFromServerAtom)
  const [convId] = useAtom(convIdAtom)
  const [, setConvDetail] = useAtom(convDetailFromServerAtom)
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)
  const [, setRequestId] = useAtom(requestIdAtom)

  const router = useRouter()
  const id = slug ? slug[0] : slug
  const reqIdFromUrl = useSearchParams().get("r")

  // 2. 检查服务端是否id有效
  const { isError, data: convFromServer } = api.core.getConv.useQuery(
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
    if (convFromServer) setConvDetail(convFromServer)
  }, [convFromServer])

  // 3. 当会话列表变动后（比如清除或者清空），如果命中了当前会话，则清除，可以涵盖单删或者多删
  useEffect(() => {
    if (convId && !convs.find((c) => c.id === convId)) {
      setConvDetail(null)
      console.log("-- clean conv since not existed now")
      if (id) router.push("/tt") // 如果不在列表页，还要退回去
    }
  }, [convs])

  // 4. 更新 request id
  useEffect(() => {
    setRequestId(reqIdFromUrl)
  }, [reqIdFromUrl])

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <ConvApps />

      <ConvControl />

      <ConvQuery />
    </div>
  )
}
