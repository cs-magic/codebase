"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"
import { coreStore } from "../store/core.valtio"
import { Chats } from "./chats"
import { ConvControl } from "./conv-control"
import { ConvQuery } from "./conv-query"

export default function Conv({
  convIdInUrl,
  reqIdInUrl,
}: {
  convIdInUrl: string | undefined
  reqIdInUrl: string | null
}) {
  const router = useRouter()

  const { convId } = useSnapshot(coreStore)

  const { data: convInDB } = api.core.getConv.useQuery(
    { id: convIdInUrl! },
    {
      enabled: !!convIdInUrl && convId !== convIdInUrl,
    },
  )

  useEffect(() => {
    // loading
    if (convInDB === undefined) return

    // not found, todo: home
    if (convInDB === null) return router.replace("/tt")

    const { currentRequestId: ridInDB, id: convIdInDB } = convInDB

    // invalid request, redirect
    if (!!ridInDB && !convInDB.requests.find((r) => r.id === reqIdInUrl))
      return router.replace(`/tt${convIdInDB}?r=${ridInDB}`)

    coreStore.initConvFromServer(convInDB, reqIdInUrl)
  }, [convInDB])

  useEffect(() => {
    if (convIdInUrl) return

    coreStore.returnToHome()
  }, [convIdInUrl])

  // 首次拿数据
  // useConvInitFromServer(convIdInUrl, reqIdInUrl)

  // useConvSearchParams(convIdInUrl, reqIdInUrl)

  // useConvClean(convIdInUrl)

  console.log("== Conv ==")

  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <Chats />

      <div className={"w-full max-w-[720px] mx-auto p-2 shrink-0"}>
        <ConvControl />

        <ConvQuery />
      </div>
    </div>
  )
}
