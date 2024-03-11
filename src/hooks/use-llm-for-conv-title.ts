import { useSnapshot } from "valtio"
import { ILLMRequest } from "../schema/sse"
import { convStore } from "../store/conv.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForConvTitle = () => {
  const { conv } = useSnapshot(convStore)
  // const [conv] = useAtom(convAtom)
  // const [, updateConvTitle] = useAtom(updateConvTitleAtom)

  const llmRequest: ILLMRequest = {
    type: "conv-title",
    status: !conv ? "unknown" : checkRespondingStatus(conv.titleResponse),
    convId: conv?.id,
  }

  useLlmPusher(
    llmRequest,
    (func) => {
      if (!conv) return
      convStore.updateConvTitle(conv.id, func)
    },
    false,
  )

  useLlmSse(llmRequest)
}
