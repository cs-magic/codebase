import { useSnapshot } from "valtio"
import { ILLMRequest } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLLMPusher } from "./use-llm-pusher"
import { useLLMSSE } from "./use-llm-sse"
import { useSession } from "next-auth/react"

export const useLLMForConvTitle = () => {
  const { conv } = useSnapshot(coreStore)
  const userId = useSession().data?.user.id

  const llmRequest: ILLMRequest | null =
    conv && userId
      ? {
          type: "conv-title",
          status: !conv ? "unknown" : checkRespondingStatus(conv.titleResponse),
          convId: conv.id,
          userId,
        }
      : null

  useLLMPusher(llmRequest, {
    update: (func) => {
      if (!conv) return
      coreStore.updateConvTitle(conv.id, func)
    },
  })

  useLLMSSE(llmRequest)
}
