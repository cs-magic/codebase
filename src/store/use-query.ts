import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { nanoid } from "nanoid"
import { conversationStore } from "@/store/conversation"
import { useAddConversation } from "@/store/use-add-conv"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useQuery() {
  const addConversation = useAddConversation()

  const queryLLM = api.llm.queryConversation.useMutation({
    onError: () => {
      // todo: any rollback?
      toast.error("消息回复出错，请刷新后重试！")
    },
    onSuccess: (data) => {
      data.forEach(({ requestId, result }) => {
        if (!result) return toast.error(`App ${requestId} 出错`)
        console.log({
          pApps: conversationStore.pApps.map((i) => i.id),
          requestId,
          result,
        })
        const pApp = conversationStore.pApps.find((p) => p.id === requestId)
        // 有可能已经换成新的pApp了
        if (pApp) pApp.needFetchLLM = true
      })
    },
  })

  return async (query: string) => {
    if (!query) return toast.error("不能为空")
    console.log({ query })

    // optimistic update
    if (!conversationStore.currentConversationId) await addConversation()
    const conversation = conversationStore.currentConversation!
    console.log("conversation: ", conversation)
    const { id: conversationId, messages, mainMessages } = conversation

    const id = nanoid()

    messages.push({
      id,
      updatedAt: new Date(),
      content: query,
      role: "user",
      conversationId,
      pAppId: null,
      parentId: null,
      createdAt: new Date(),
    })

    mainMessages.push(id)

    const context = mainMessages.map((s) => messages.find((m) => m.id === s)!)

    console.log("query context: ", { context, mainMessages })

    queryLLM.mutate({ conversationId, messages: context })
  }
}
