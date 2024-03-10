import { useAtom } from "jotai"
import { ILLMRequest } from "../schema/sse"
import { convAtom, updateConvTitleAtom } from "../store/conv.atom"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForConvTitle = () => {
  const [conv] = useAtom(convAtom)
  const [, updateConvTitle] = useAtom(updateConvTitleAtom)

  const llmRequest: ILLMRequest = {
    type: "conv-title",
    status: !conv ? "unknown" : checkRespondingStatus(conv.titleResponse),
    convId: conv?.id,
  }

  useLlmPusher(llmRequest, (func) => updateConvTitle(conv?.id, func), false)

  useLlmSse(llmRequest)
}
