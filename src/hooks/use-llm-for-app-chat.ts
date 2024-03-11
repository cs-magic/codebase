import { useSnapshot } from "valtio"
import { IAppClient } from "../schema/app.detail"
import { ILLMRequest } from "../schema/sse"
import { core } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForAppChat = (app: IAppClient) => {
  const { requestId } = useSnapshot(core)

  const { response, id: appId, clientId: appClientId } = app

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
      core.updateAppResponse(requestId, appClientId, response)
    },
    onInit: () => {
      // setIsDraft(false)
    },
    autoClose: true,
  })

  useLlmSse(llmRequest)
}
