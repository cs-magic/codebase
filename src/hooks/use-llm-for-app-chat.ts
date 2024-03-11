import { useSnapshot } from "valtio"
import { IResponse } from "../schema/response"
import { ILLMRequest } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForChat = (chat: IResponse) => {
  const { requestId } = useSnapshot(coreStore)

  const llmRequest: ILLMRequest = {
    type: "app-response",
    status: checkRespondingStatus(chat),
    requestId,
    appId: chat.appId!,
  }

  useLlmPusher(llmRequest, {
    update: (response) => {
      if (!requestId) return
      coreStore.updateChat(requestId, chat.id, response)
    },
    onInit: () => {
      // setIsDraft(false)
    },
    autoClose: true,
  })

  useLlmSse(llmRequest)
}
