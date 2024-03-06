"use client"
import {
  serverConvDetailAtom,
  convIdAtom,
  serverConvListFAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { produce } from "immer"
import { useAtom } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
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
  const [convs] = useAtom(serverConvListFAtom)
  const [convId] = useAtom(convIdAtom)
  const [conv, setConv] = useAtom(serverConvDetailAtom)
  const [, openAlertDialog] = useAtom(openAlertDialogAtom)

  const router = useRouter()
  const id = slug ? slug[0] : slug
  const reqIdFromUrl = useSearchParams().get("r")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (conv?.requests.some((r) => r.id === reqIdFromUrl)) {
      setConv((conv) => ({ ...conv, currentRequestId: reqIdFromUrl }))
    }
  }, [reqIdFromUrl])

  // 首页
  useEffect(() => {
    if (id) return
    console.log(ansiColors.red("clear conv since no id"))
    setConv(null)
  }, [id])

  // 3. 当会话列表变动后（比如清除或者清空），如果命中了当前会话，则清除，可以涵盖单删或者多删
  useEffect(() => {
    if (convId && !convs.find((c) => c.id === convId)) {
      console.log(ansiColors.red("clear conv since not existed now"))
      setConv(null)
      if (id) {
        console.log(ansiColors.blue(`router push --> /tt`))
        router.push("/tt") // 如果不在列表页，还要退回去
      }
    }
  }, [convs])

  // 2. 检查服务端是否id有效
  const { isError, data: convFromServer } = api.core.getConv.useQuery(
    {
      id: id!,
    },
    { enabled: !!id },
  )
  /**
   * conv 逻辑
   * ~~无脑对齐即可，就是个 context 作用~~
   * ~~由于conv基于requestId会拉多次，所以只要第一次就可以~~
   * 避免多次刷新！重要！
   */
  useEffect(() => {
    const skip = !convFromServer

    if (skip) return console.log(`setting conv since fetched (skip=${skip})`)

    setLoaded(true)

    console.log(ansiColors.red(`setting conv since fetched (skip=${skip}): `), {
      convId,
      serverId: convFromServer?.id,
      reqIdFromUrl,
    })
    setConv(convFromServer)
  }, [convFromServer])

  // 2.1 无效则跳转
  useEffect(() => {
    if (!isError) return
    openAlertDialog("没有此会话！")
  }, [isError])

  /**
   * request id 逻辑
   * 1. 访问 rid, rid命中，则设置
   * 2. 否则，设置为数据库中最新的rid，或者为空
   */
  useEffect(() => {
    // console.log(ansiColors.red("try to update reqId: "), {
    //   reqIdFromUrl,
    //   convFromServer,
    // })
    if (!convFromServer) return

    if (reqIdFromUrl) {
      if (convFromServer.requests.some((r) => r.id === reqIdFromUrl)) {
        // setRequestId(reqIdFromUrl)
      } else {
        console.log(ansiColors.blue(`router --> /tt/${id}`))
        router.replace(`/tt/${id}`)
      }
    } else {
      if (convFromServer.currentRequestId) {
        console.log(
          ansiColors.blue(
            `router push --> /tt/${id}?r=${convFromServer.currentRequestId}`,
          ),
        )
        router.replace(`/tt/${id}?r=${convFromServer.currentRequestId}`)
      } else {
        // setRequestId(null)
      }
    }
  }, [reqIdFromUrl, convFromServer])

  // if (!loaded) return null

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
