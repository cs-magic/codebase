import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { convStore } from "../store/conv.valtio"
import { getConvUrl } from "../utils"

export const useConvRequestSlider = () => {
  // const [convId] = useAtom(convIdAtom)
  // const [requests] = useAtom(requestsAtom)
  // const [requestId] = useAtom(requestIdAtom)

  const { convId, requests, requestId } = useSnapshot(convStore)

  const value = requests.findIndex((r) => r.id === requestId) + 1
  const [tempValue, setTempValue] = useState(value)

  const router = useRouter()

  useEffect(() => {
    if (value === tempValue) return

    const newReqId = requests[tempValue - 1]?.id

    if (!convId || !newReqId || newReqId === requestId) return

    router.replace(getConvUrl({ id: convId, currentRequestId: newReqId }))
  }, [tempValue])

  return {
    min: 1,
    max: requests.length,
    value,
    onChange: setTempValue,
  }
}
