import { useAtom } from "jotai"
import { useEffect } from "react"
import { useRouterWithLog } from "../../packages/common-hooks/use-router-with-log"
import { convAtom } from "../store/conv"
import { getConvUrl } from "../utils"

/**
 * ⭐️⭐️⭐️ 2024-03-09 14:34:29
 *
 * 1. visit /tt/cid?r=rid
 * 1.1 cid --> conv -- !conv.rids.includes(rid) --> /tt/cid
 *
 * 2. visit /tt/cid
 * 2.1 cid --> conv -- !!conv.rid --> /tt/cid?r=rid
 *
 * @param convIdInUrl
 * @param reqIdInUrl
 */
export const useConvSearchParams = (
  convIdInUrl: string | undefined,
  reqIdInUrl: string | null,
) => {
  const [conv] = useAtom(convAtom)

  const router = useRouterWithLog()

  useEffect(() => {
    // 确保已经刷新对齐了conv
    if (conv && convIdInUrl && convIdInUrl === conv.id) {
      if (
        // 1. 有 rid，但是实际不存在
        (!reqIdInUrl && !!conv.currentRequestId) ||
        // 2. 没有rid，但是实际有老师请求
        (reqIdInUrl && !conv.requests.some((r) => r.id === reqIdInUrl))
      )
        router.replace(getConvUrl(conv))
    }
  }, [convIdInUrl, reqIdInUrl, conv?.id])
}
