import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "../../packages/common-trpc/react"
import { convIdAtom, requestIdAtom, requestsAtom } from "../store/conv"
import { useAtom } from "jotai"

export const useRequestSlider = () => {
  const [convId] = useAtom(convIdAtom)
  const [requests] = useAtom(requestsAtom)
  const [requestId] = useAtom(requestIdAtom)
  const currentIndex = requests.findIndex((r) => r.id === requestId)

  const total = requests.length
  const router = useRouter()

  return {
    value: currentIndex + 1,
    min: 1,
    max: total,
    onChange: (n: number) => {
      const currentRequest = requests[n - 1]
      if (!currentRequest) return
      console.log(
        ansiColors.blue(
          `router replace --> /tt/${convId}?r=${currentRequest.id}`,
        ),
      )
      router.replace(`/tt/${convId}?r=${currentRequest.id}`)
    },
  }
}
