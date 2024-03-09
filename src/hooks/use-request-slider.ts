import { useAtom } from "jotai"
import { useRouterWithLog } from "../../packages/common-hooks/use-router-with-log"
import { convIdAtom, requestIdAtom, requestsAtom } from "../store/conv"

export const useRequestSlider = () => {
  const [convId] = useAtom(convIdAtom)
  const [requests] = useAtom(requestsAtom)
  const [requestId] = useAtom(requestIdAtom)
  const currentIndex = requests.findIndex((r) => r.id === requestId)

  const total = requests.length
  const router = useRouterWithLog()

  return {
    value: currentIndex + 1,
    min: 1,
    max: total,
    onChange: (n: number) => {
      const currentRequest = requests[n - 1]
      if (!currentRequest) return

      router.replace(`/tt/${convId}?r=${currentRequest.id}`)
    },
  }
}
