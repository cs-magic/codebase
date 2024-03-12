import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { IEnsureResponse } from "../../packages/common-pusher/schema"
import { ITransEvent } from "../../packages/common-sse/schema"
import { ILLMPusherListener } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { useLLMPusher } from "./use-llm-pusher"

export const useLLMForConvTitle = () => {
  const userId = useSession().data?.user.id

  // todo: should listen pusher on user level, instead of on conv
  const llmPusherListener: ILLMPusherListener | null = useMemo(
    () =>
      userId
        ? {
            type: "conv-title",
            userId,
          }
        : null,
    [userId],
  )

  const options = useMemo(
    () => ({
      ensureResponse: ((event: ITransEvent["data"]) =>
        "convId" in event
          ? coreStore.convs.find((c) => c.id === event.convId)?.titleResponse ??
            null
          : null) as IEnsureResponse,
    }),
    [],
  )

  useLLMPusher(llmPusherListener, options)

  // useLLMSSE(llmPusherListener)
}
