import { useAtom } from "jotai"
import { ILLMRequest } from "../schema/sse"
import {
  checkRespondingStatus,
  convAtom,
  updateConvTitleAtom,
} from "../store/conv"
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

  useLlmPusher(llmRequest, updateConvTitle, false)

  useLlmSse(llmRequest)
}
