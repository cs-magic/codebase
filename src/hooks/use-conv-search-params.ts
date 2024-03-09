import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { convAtom } from "../store/conv"

export const useConvSearchParams = (reqIdFromUrl: string | null) => {
  const [conv, setConv] = useAtom(convAtom)
  const router = useRouter()

  const id = conv?.id

  /**
   * todo: redundant ?
   */
  useEffect(() => {
    if (conv?.requests.some((r) => r.id === reqIdFromUrl)) {
      console.log(ansiColors.red(`setting conv since reqIdFromUrl hit: `), {
        id,
        serverId: conv?.id,
      })
      setConv((conv) => ({ ...conv, currentRequestId: reqIdFromUrl }))
    }
  }, [reqIdFromUrl])

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
    if (!conv) return

    if (reqIdFromUrl) {
      if (conv.requests.some((r) => r.id === reqIdFromUrl)) {
        // setRequestId(reqIdFromUrl)
      } else {
        console.log(ansiColors.blue(`router --> /tt/${id}`))
        router.replace(`/tt/${id}`)
      }
    } else {
      if (conv.currentRequestId) {
        console.log(
          ansiColors.blue(
            `router push --> /tt/${id}?r=${conv.currentRequestId}`,
          ),
        )
        router.replace(`/tt/${id}?r=${conv.currentRequestId}`)
      } else {
        // setRequestId(null)
      }
    }
  }, [reqIdFromUrl, conv])
}
