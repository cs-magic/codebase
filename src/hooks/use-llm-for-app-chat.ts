import { useMemo } from "react"
import { useSnapshot } from "valtio"
import { IResponse, IUpdateResponse } from "../schema/response"
import { ILLMPusherListener } from "../schema/sse"
import { coreStore } from "../store/core.valtio"
import { useLLMPusher } from "./use-llm-pusher"
import { useLLMSSE } from "./use-llm-sse"

export const useLLMForChat = (chat: IResponse) => {
  const { requestId } = useSnapshot(coreStore)

  const { appId, id: chatId } = chat

  // NOTE: 必须固定参数，否则 useLLMPusher 会无限rerender，导致pusher频繁地连接与断开
  const listener: ILLMPusherListener | null = useMemo(
    () =>
      !requestId || !appId
        ? null
        : {
            type: "app-response",
            requestId,
            appId,
          },
    [requestId, appId],
  )

  const options = useMemo(
    () => ({
      ensureResponse: () =>
        coreStore.chats.find((c) => c.id === chatId) ?? null,
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

  // const debugPusherChat = useMemo(() => console.log("-- debugPusherChat: ", { appId, chatId, requestId }), [requestId, appId, chatId])

  useLLMPusher(listener, options)

  useLLMSSE(listener)
}
