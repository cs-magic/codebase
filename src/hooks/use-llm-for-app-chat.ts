import { useAtom } from "jotai"
import { IBaseResponse } from "../schema/query"
import { ILLMRequest } from "../schema/sse"
import { updateAppResponseAtom } from "../store/conv.atom"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForAppChat = (
  requestId: string | null,
  appId: string,
  response: IBaseResponse | undefined,
) => {
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
    () => {
      // setIsDraft(false)
    },
  )

  useLlmSse(llmRequest)
}
