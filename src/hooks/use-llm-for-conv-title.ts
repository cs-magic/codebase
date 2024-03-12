import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { useSnapshot } from "valtio"
import { IUpdateResponse } from "../schema/response"
import { ILLMRequest } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { useLLMPusher } from "./use-llm-pusher"
import { useLLMSSE } from "./use-llm-sse"

export const useLLMForConvTitle = () => {
  const { convId, titleStatus } = useSnapshot(coreStore)
  const userId = useSession().data?.user.id

  // todo: should listen pusher on user level, instead of on conv
  const llmRequest: ILLMRequest | null = useMemo(
    () =>
      userId && convId
        ? {
            type: "conv-title",
            status: titleStatus, // title status shouldn't be monitored by pusher
            convId,
            userId,
          }
        : null,
    [convId, userId],
  )

  const options = useMemo(
    () => ({
      update: (func: IUpdateResponse) => {
        if (!convId) return
        coreStore.updateConvTitle(convId, func)
      },
    }),
    [convId],
  )

  useLLMPusher(llmRequest, options)

  useLLMSSE(llmRequest)
}
