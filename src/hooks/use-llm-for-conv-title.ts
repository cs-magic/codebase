import { useSnapshot } from "valtio"
import { ILLMRequest } from "../schema/sse"
import { coreValtio } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForConvTitle = () => {
  const { conv } = useSnapshot(coreValtio)

  const llmRequest: ILLMRequest = {
    type: "conv-title",
    status: !conv ? "unknown" : checkRespondingStatus(conv.titleResponse),
    convId: conv?.id,
  }

  useLlmPusher(
    llmRequest,
    (func) => {
      if (!conv) return
      coreValtio.updateConvTitle(conv.id, func)
    },
    false,
  )

  useLlmSse(llmRequest)
}
