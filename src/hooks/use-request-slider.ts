import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "../../packages/common/lib/trpc/react"
import { convIdAtom, requestIdAtom, requestsAtom } from "../store/conv"
import { useAtom } from "jotai"

export const useRequestSlider = () => {
  const [convId] = useAtom(convIdAtom)
  const [requests] = useAtom(requestsAtom)
  const [requestId] = useAtom(requestIdAtom)
  const currentIndex = requests.findIndex((r) => r.id === requestId)

  const total = requests.length
  const router = useRouter()
  const updateConv = api.core.updateConv.useMutation()

  const [cur, setCur] = useState(currentIndex)

  useEffect(() => {
    console.log({ cur })
    const currentRequest = requests[cur - 1]
    if (!currentRequest) return
    router.replace(`/tt/${convId}?r=${currentRequest.id}`)
    // updateConv.mutate({ where: { id: convId }, data: { currentRequestId} })
  }, [cur])

  return {
    value: currentIndex + 1,
    min: 1,
    max: total,
    onChange: setCur,
  }
}
