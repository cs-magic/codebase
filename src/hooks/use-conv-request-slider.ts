import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { convIdAtom, requestIdAtom, requestsAtom } from "../store/conv"
import { getConvUrl } from "../utils"

export const useConvRequestSlider = () => {
  const [convId] = useAtom(convIdAtom)
  const [requests] = useAtom(requestsAtom)
  const [requestId] = useAtom(requestIdAtom)
  const value = requests.findIndex((r) => r.id === requestId) + 1
  const [tempValue, setTempValue] = useState(-1)

  const router = useRouter()

  useEffect(() => {
    setTempValue(value)
  }, [value])

  useEffect(() => {
    const newReqId = requests[tempValue - 1]?.id
    // console.log({ value, tempValue, newReqId })
    if (
      convId &&
      newReqId
      // 这个暂时不能加，因为requestId还没同步
      // && newReqId !== requestId
    ) {
      const newUrl = getConvUrl({ id: convId, currentRequestId: newReqId })
      router.replace(newUrl)
    }
  }, [tempValue])

  return {
    min: 1,
    max: requests.length,
    value: tempValue,
    onChange: setTempValue,
  }
}
