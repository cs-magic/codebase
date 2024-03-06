"use client"
import {
  convDetailFromServerAtom,
  convIdAtom,
  convsFromServerAtom,
  requestIdAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { api } from "../../../../../packages/common/lib/trpc/react"

import { openAlertDialogAtom } from "../../../../../packages/common/store/ui"
import { ConvApps } from "../../../../components/conv-apps"
import { ConvControl } from "../../../../components/conv-control"
import { ConvQuery } from "../../../../components/conv-query"

export default function ConvPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const [convs] = useAtom(convsFromServerAtom)
  const [convId] = useAtom(convIdAtom)
  const [, setConvDetail] = useAtom(convDetailFromServerAtom)
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)
  const [currentRequestId, setRequestId] = useAtom(requestIdAtom)

  const router = useRouter()
  const id = slug ? slug[0] : slug
  const reqIdFromUrl = useSearchParams().get("r")

  // 首页
  useEffect(() => {
    if (!id) setConvDetail(null)
  }, [id])

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

  /**
   * conv 逻辑，无脑对齐即可，就是个 context 作用
   */
  useEffect(() => {
    if (!convFromServer) return
    setConvDetail(convFromServer)
  }, [convFromServer])

  // 3. 当会话列表变动后（比如清除或者清空），如果命中了当前会话，则清除，可以涵盖单删或者多删
  useEffect(() => {
    if (convId && !convs.find((c) => c.id === convId)) {
      setConvDetail(null)
      console.log("-- clean conv since not existed now")
      if (id) router.push("/tt") // 如果不在列表页，还要退回去
    }
  }, [convs])

  /**
   * request id 逻辑
   * 1. 访问 rid, rid命中，则设置
   * 2. 否则，设置为数据库中最新的rid，或者为空
   */
  useEffect(() => {
    console.log(ansiColors.red("try to update reqId: "), {
      reqIdFromUrl,
      convFromServer,
    })
    if (!convFromServer) return

    if (reqIdFromUrl) {
      if (convFromServer.requests.some((r) => r.id === reqIdFromUrl)) {
        setRequestId(reqIdFromUrl)
      } else {
        router.replace(`/tt/${id}`)
      }
    } else {
      if (convFromServer.currentRequestId) {
        router.replace(`/tt/${id}?r=${convFromServer.currentRequestId}`)
      } else {
        setRequestId(null)
      }
    }
  }, [reqIdFromUrl, convFromServer])

  // 清空request
  useEffect(() => {
    if (!convId) setRequestId(null)
  }, [convId])

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <ConvApps />

      <div className={"w-full max-w-[720px] mx-auto p-2 shrink-0"}>
        <ConvControl />

        <ConvQuery />
      </div>
    </div>
  )
}
