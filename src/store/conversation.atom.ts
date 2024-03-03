import { atom, useAtom } from "jotai"
import { IConversationInChat } from "@/schema/core/conversation"
import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"
import { IAppInChat } from "@/schema/core/app"
import { getNewId } from "@/lib/utils"
import { toast } from "sonner"

export const conversationsAtom = atom<IConversationInChat[]>([])
export const conversationIdAtom = atom<string | null>(null)

export const appsAtom = atom<IAppInChat[]>([])

export const conversationAtom = atom((get) =>
  get(conversationsAtom).find((c) => c.id === get(conversationIdAtom)),
)

export const refreshAppsAtom = atom(null, (get, set) => {
  const newApps = get(appsAtom).map((a) => ({ ...a, id: getNewId() }))
  set(appsAtom, newApps)
  return newApps
})

export const useDeleteAllConversationsAtom = () => {
  const router = useRouter()
  const [, setConversations] = useAtom(conversationsAtom)
  const deleteAllConversations = api.llm.deleteAllConversations.useMutation({
    onSuccess: () => {
      setConversations([])
      router.push("/tt")
    },
  })
  return () => deleteAllConversations.mutate()
}

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddConversationAtom() {
  const router = useRouter()
  const addConversation = api.llm.addConversation.useMutation()
  const [, setConversations] = useAtom(conversationsAtom)
  const [, refreshApps] = useAtom(refreshAppsAtom)

  return (title?: string) => {
    const conversationId = getNewId()

    // pessimistic update
    addConversation.mutate(
      {
        id: conversationId,
        type: "LLM",
        title,
        apps: refreshApps(), // 保证id不一样
      },
      {
        onError: () => {
          toast.error("新建会话失败")
        },
        onSuccess: (conversation) => {
          // local
          setConversations((conversations) => [conversation, ...conversations])
          // router
          router.push(`/tt/${conversationId}`) // 异步
        },
      },
    )
  }
}
