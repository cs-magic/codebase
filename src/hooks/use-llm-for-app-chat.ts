import { IBaseResponse } from "../schema/query"
import { ILLMRequest } from "../schema/sse"
import { coreValtio } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForAppChat = (
  requestId: string,
  appId: string,
  appClientId: string,
  response: IBaseResponse | undefined,
  enabled?: boolean,
) => {
  const llmRequest: ILLMRequest = {
    type: "app-response",
    status: checkRespondingStatus(response),
    requestId,
    appId,
    appClientId,
  }

  useLlmPusher(llmRequest, {
    update: (response) => {
      if (!requestId) return
      coreValtio.updateAppResponse(requestId, appClientId, response)
    },
    enabled,
    onInit: () => {
      // setIsDraft(false)
    },
    autoClose: true,
  })

  useLlmSse(llmRequest)
}
