import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"
import { useAtom } from "jotai"
import { toast } from "sonner"

import { queryConvsAtom } from "@/core/query-llm/store/query-conv.atom"

export const useDeleteAllQueryConvsAtom = () => {
  const router = useRouter()
  const [, setConversations] = useAtom(queryConvsAtom)
  const deleteAllQueryConvs = api.queryLLM.deleteAllQueryConvs.useMutation({
    onSuccess: () => {
      setConversations([])
      router.push("/tt")
    },
  })
  return () => deleteAllQueryConvs.mutate()
}

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddQueryConvAtom() {
  const router = useRouter()
  const addQueryConv = api.queryLLM.addQueryConv.useMutation()
  const [, setConversations] = useAtom(queryConvsAtom)

  return (title?: string) => {
    // pessimistic update
    addQueryConv.mutate(
      { title },
      {
        onError: () => {
          toast.error("新建会话失败")
        },
        onSuccess: (conversation) => {
          console.log("added conv: ", conversation)
          // local
          setConversations((conversations) => [conversation, ...conversations])
          // router
          router.push(`/tt/${conversation.id}`) // 异步
        },
      },
    )
  }
}
