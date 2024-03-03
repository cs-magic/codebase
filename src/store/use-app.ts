import { api } from "@/lib/trpc/react"
import { conversationStore } from "@/store/conversation"
import { IAppClient } from "@/schema/conversation"
import { last, remove } from "lodash"
import { toast } from "sonner"

/**
 * 用户在弹窗界面增加一个pApp
 * - 最多只能有3个，或者视窗口长度限制
 * - 首页里增加要持久化
 * - 会话里增加要与数据库同步
 * @param pApp
 */
export function useAddPApp() {
  const addPApp = api.llm.addPApp.useMutation()
  const { apps, messages, conversation, curPApp } = conversationStore

  return async (pApp: IAppClient) => {
    // optimistic update
    apps.push(pApp)
    const conversationId = conversation?.id
    if (conversationId) {
      await addPApp.mutateAsync({
        conversationId,
        id: pApp.id,
        modelId: pApp.modelId,
        title: pApp.title,
      })
      // 如果此时有pApp的话，更新它的最新条目
      if (curPApp) {
        messages.push({
          ...last(messages.filter((m) => m.pAppId === curPApp.id))!,
          pAppId: pApp.id,
        })
      }
    }
  }
}

/**
 * 用户在首页或者会话里删除一个pApp
 * - 最少要有1个
 * - 首页里增加要持久化
 * - 会话里增加要与数据库同步
 * @param pAppId
 */
export function useDelPApp() {
  const delPApp = api.llm.delPApp.useMutation()

  return async (pAppId: string) => {
    if (conversationStore.apps.length <= 1) return toast.error("至少需要一个")
    // optimistic update
    remove(conversationStore.apps, (i) => i.id === pAppId)
    if (conversationStore.conversation?.id)
      delPApp.mutate({
        conversationId: conversationStore.conversation.id,
        pAppId,
      })

    if (pAppId === conversationStore.curPApp?.id) {
      conversationStore.curPApp = conversationStore.apps[0] ?? null
    }
  }
}

export const resetPAppSSE = (pAppId: string) => {
  const pApp = conversationStore.apps.find((p) => p.id === pAppId)
  if (pApp) pApp.needFetchLLM = false
}
export const selectPApp = (pApp: IAppClient) => {
  conversationStore.curPApp = pApp
}
