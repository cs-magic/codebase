import { useAtom } from "jotai"
import { IBaseResponse } from "../schema/query"
import { ILLMRequest } from "../schema/sse"
import {
  checkRespondingStatus,
  requestIdAtom,
  updateAppResponseAtom,
} from "../store/conv"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForAppChat = (
  appId: string,
  response: IBaseResponse | undefined,
) => {
  const [requestId] = useAtom(requestIdAtom)

  const [, updateAppResponse] = useAtom(updateAppResponseAtom)

  const llmRequest: ILLMRequest = {
    type: "app-response",
    status: checkRespondingStatus(response),
    requestId,
    appId,
  }

  useLlmPusher(
    llmRequest,
    (response) => {
      if (!requestId) return
      updateAppResponse(requestId, appId, response)
    },
    true,
  )

  useLlmSse(llmRequest)
}
