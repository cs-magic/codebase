import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { nanoid } from "nanoid"
import { NANOID_LEN } from "@/config/system"
import { conversationStore } from "@/store/conversation"

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 id，用于其他的函数
 */
export function useAddConversation() {
  const router = useRouter()
  const addConversation = api.llm.addConversation.useMutation({
    onError: () => {
      // todo: more friendly alert dialog
      toast.error("不好意思，新建会话失败，请刷新后再试，该会话将被重置！")
    },
  })
  const userId = useSession().data?.user.id

  return async () => {
    if (!userId) return

    conversationStore.conversationsValid = false
    const conversationId = nanoid(NANOID_LEN)

    const pApps = conversationStore.pApps.map((p) => ({
      ...p,
      needFetchLLM: false, // reset need-fetch
    }))

    conversationStore.conversations.splice(0, 0, {
      id: conversationId,
      pApps,
      messages: [],
      mainMessages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      fromUserId: userId,
      title: "",
      type: "LLM",
    })

    const data = await addConversation.mutateAsync({
      id: conversationId,
      pApps,
      type: "LLM",
    })

    const conversation = conversationStore.conversations.find(
      (c) => c.id === data.id,
    )
    // 若还在的话
    if (conversation) {
      conversation.pApps = data.pApps
    }
    conversationStore.currentConversationId = conversationId
    conversationStore.conversationsValid = true // final valid
    router.push(`/tt/${conversationId}`) // 异步
    return conversationId
  }
}
