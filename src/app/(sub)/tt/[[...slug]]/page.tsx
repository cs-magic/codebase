"use client"

import ansiColors from "ansi-colors"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "../../../../../packages/common-trpc/react"
import Conv from "../../../../components/conv"
import { useEffect } from "react"
import { coreStore } from "../../../../store/core.valtio"

/**
 * 1. 判断是否要拉取 conv
 * 1.1 拉取了 conv，判断 req 之类的数据正不正确
 *
 * @param slug
 * @constructor
 */
export default function ConvPage({
  params: { slug },
}: {
  params: {
    slug?: string[]
  }
}) {
  const convIdInUrl = slug ? slug[0] : slug
  const reqIdInUrl = useSearchParams().get("r")

  console.log(ansiColors.red("== ConvPage =="), { convIdInUrl, reqIdInUrl })

  return <Conv convIdInUrl={convIdInUrl} reqIdInUrl={reqIdInUrl} />
}

const FetchConv = ({
  convIdInUrl,
  reqIdInUrl,
}: {
  convIdInUrl?: string
  reqIdInUrl?: string
}) => {
  const router = useRouter()

  api.core.getConv.useQuery(
    {
      id: convIdInUrl!,
    },
    {
      enabled: !!convIdInUrl,
      onError: () => {
        router.replace("/")
      },
      onSuccess: (conv) => {
        coreStore.initConvFromServer(conv)

        const { currentRequestId } = conv

        const reqIds = conv.requests.map((r) => r.id)

        if (!!reqIds.length && (!reqIdInUrl || !reqIds.includes(reqIdInUrl))) {
          router.replace(`/tt/${conv.id}?r=${currentRequestId}`)
        }

        if (reqIdInUrl && reqIds.includes(reqIdInUrl))
          coreStore.updateRequestFromServer(
            conv.requests.find((r) => r.id === currentRequestId)!,
          )
      },
    },
  )
}
