"use client"

import { useConvClean } from "../hooks/use-conv-clean"
import { useConvFromServer } from "../hooks/use-conv-from-server"
import { useConvSearchParams } from "../hooks/use-conv-search-params"
import { ConvApps } from "./conv-apps"
import { ConvControl } from "./conv-control"
import { ConvQuery } from "./conv-query"

export default function Conv({
  convIdInUrl,
  reqIdInUrl,
}: {
  convIdInUrl: string | undefined
  reqIdInUrl: string | null
}) {
  useConvFromServer(convIdInUrl, reqIdInUrl)

  useConvSearchParams(convIdInUrl, reqIdInUrl)

  useConvClean(convIdInUrl)

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
