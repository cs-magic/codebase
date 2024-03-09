import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { convAtom } from "../store/conv"

export const useConvSearchParams = (
  convIdInUrl: string | undefined,
  reqIdInUrl: string | null,
) => {
  const [conv, setConv] = useAtom(convAtom)
  const router = useRouter()

  /**
   * todo: redundant ?
   */
  useEffect(() => {
    if (conv?.requests.some((r) => r.id === reqIdInUrl)) {
      console.log(ansiColors.red(`setting conv since reqIdFromUrl hit: `), {
        id: convIdInUrl,
        serverId: conv?.id,
      })
      setConv((conv) => ({ ...conv, currentRequestId: reqIdInUrl }))
    }
  }, [reqIdInUrl])

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

    if (reqIdInUrl) {
      if (conv.requests.some((r) => r.id === reqIdInUrl)) {
        // setRequestId(reqIdFromUrl)
      } else {
        console.log(ansiColors.blue(`router --> /tt/${convIdInUrl}`))
        router.replace(`/tt/${convIdInUrl}`)
      }
    } else {
      if (convIdInUrl && conv.currentRequestId) {
        console.log(
          ansiColors.blue(
            `router push --> /tt/${convIdInUrl}?r=${conv.currentRequestId}`,
          ),
        )
        router.replace(`/tt/${convIdInUrl}?r=${conv.currentRequestId}`)
      } else {
        // setRequestId(null)
      }
    }
  }, [reqIdInUrl, conv])
}
