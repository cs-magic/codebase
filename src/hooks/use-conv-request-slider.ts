import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { coreStore } from "../store/core.valtio"
import { getConvUrl } from "../utils"

export const useConvRequestSlider = () => {
  const { convId, requests, requestId } = useSnapshot(coreStore)

  const value = requests.findIndex((r) => r.id === requestId) + 1

  const [tempValue, setTempValue] = useState(value)

  const router = useRouter()

  useEffect(() => {
    const newReqId = requests[tempValue - 1]?.id

    console.log({ value, tempValue, convId, newReqId })

    if (value === tempValue) return

    if (!convId || !newReqId || newReqId === requestId) return

    coreStore.updateRequestId(newReqId)

    router.replace(getConvUrl({ id: convId, currentRequestId: newReqId }))
  }, [tempValue])

  return {
    min: 1,
    max: requests.length,
    value,
    onChange: setTempValue,
  }
}
