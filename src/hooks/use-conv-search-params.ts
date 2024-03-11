import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"
import { coreStore } from "../store/core.valtio"
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
  const {
    convId: convIdCurrent,
    requestIds,
    requestId: reqIdCurrent,
  } = useSnapshot(coreStore)

  const updateConv = api.core.updateConv.useMutation()

  const router = useRouter()

  const isDraft =
    !convIdInUrl || !convIdCurrent || convIdInUrl !== convIdCurrent

  const hasReqInDB = !!reqIdInUrl && requestIds.includes(reqIdInUrl)

  const shouldGotoCurrent =
    !isDraft && // 1. 没有 rid，但有游标
    ((!reqIdInUrl && !!reqIdCurrent) ||
      // 2. 有rid，但没有游标
      (reqIdInUrl && !hasReqInDB))

  const shouldGotoNew =
    !isDraft &&
    // 有 rid
    reqIdInUrl &&
    // 有有效
    hasReqInDB &&
    // todo: 下面这条似乎始终为 true
    // 但不等于当下
    reqIdCurrent !== reqIdInUrl

  useEffect(() => {
    console.log(ansiColors.red("-- useConvSearchParams: "), {
      convIdInUrl,
      convIdCurrent,

      reqIdInUrl,
      reqIdCurrent,

      isDraft,
      hasReqInDB,
      shouldGotoCurrent,
      shouldGotoNew,
    })

    // 确保已经刷新对齐了conv
    if (isDraft) return

    if (shouldGotoCurrent)
      router.replace(
        getConvUrl({ id: convIdCurrent, currentRequestId: reqIdCurrent }),
      )
    // 从客户端触发更新数据库里的指针（无需invalidate）
    else if (shouldGotoNew) {
      // console.log(`-- request id change: ${requestId} --> ${reqIdInUrl}`)

      // 更新convs里的指针（无需关心conv里的指针，因为始终以convs对齐）
      updateConv.mutate({
        where: { id: convIdCurrent },
        data: { currentRequestId: reqIdInUrl },
      })
    }
  }, [convIdInUrl, reqIdInUrl])
}
