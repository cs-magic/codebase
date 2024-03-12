import { useMemo } from "react"
import { useSnapshot } from "valtio"
import { IResponse, IUpdateResponse } from "../schema/response"
import { ILLMRequest } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLLMPusher } from "./use-llm-pusher"
import { useLLMSSE } from "./use-llm-sse"

export const useLLMForChat = (chat: IResponse) => {
  const { requestId } = useSnapshot(coreStore)

  const status = checkRespondingStatus(chat)
  const { appId, id: chatId } = chat

  // NOTE: 必须固定参数，否则 useLLMPusher 会无限rerender，导致pusher频繁地连接与断开
  const llmRequest: ILLMRequest | null = useMemo(
    () =>
      !requestId || !appId
        ? null
        : {
            type: "app-response",
            status, // status 只是一个客户端参数，实际服务端不需要，pusher也不应该监控它
            requestId,
            appId,
          },
    [requestId, appId],
  )

  const options = useMemo(
    () => ({
      update: (func: IUpdateResponse) => {
        if (!requestId) return
        coreStore.updateChat(requestId, chatId, func)
      },
      onInit: () => {
        // setIsDraft(false)
      },
    }),
    [requestId, chatId],
  )

  const debugPusherChat = useMemo(() => {
    console.log("-- debugPusherChat: ", { appId, chatId, requestId })
  }, [requestId, appId, chatId])

  useLLMPusher(llmRequest, options)

  useLLMSSE(llmRequest)
}
