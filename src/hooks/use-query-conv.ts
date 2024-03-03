import { useRouter } from "next/navigation"
import { api } from "../../packages/common/lib/trpc/react"
import { useAtom } from "jotai"
import { toast } from "sonner"

import {
  convAtom,
  convIdAtom,
  convsAtom,
  latestRequestAtom,
} from "@/store/conv.atom"
import { persistedAppsAtom } from "@/store/app.atom"
import { useSession } from "next-auth/react"

import {
  uiCheckAuthAlertDialogOpen,
  userQueryAtom,
} from "../../packages/common/store/user"

export const useDeleteAllQueryConvsAtom = () => {
  const router = useRouter()
  const [, setConversations] = useAtom(convsAtom)
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
  const [, setConversations] = useAtom(convsAtom)

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

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddQueryConv() {
  const router = useRouter()
  const addConversation = api.queryLLM.addQueryConv.useMutation()
  const [, setConvs] = useAtom(convsAtom)
  const [, setConvId] = useAtom(convIdAtom)

  return (title?: string) => {
    // 数据库新增
    return addConversation.mutateAsync(
      {
        title,
      },
      {
        onError: () => {
          toast.error("新建会话失败")
        },
        onSuccess: (data) => {
          // 会话列表更新，是超集
          setConvs((convs) => [data, ...convs])

          // 会话详情更新
          setConvId(data.id)

          // 路由跳转，并且避免再拿数据
          router.push(`/tt/${data.id}?fetched=true`) // 异步
        },
      },
    )
  }
}

/**
 * 用户在会话列表页的展开工具里删除一个会话
 * @param conversationId
 */
export function useDelConv() {
  const router = useRouter()
  const delConversation = api.queryLLM.deleteQueryConvs.useMutation()
  const [, setConvs] = useAtom(convsAtom)
  const [convId] = useAtom(convIdAtom)

  return (id: string) => {
    void delConversation.mutate(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast.error("删除失败！")
        },
        onSuccess: () => {
          setConvs((cs) => cs.filter((c) => c.id !== id))
          if (id === convId) router.push("/tt")
        },
      },
    )
  }
}

export const useQueryInChat = () => {
  const [convs] = useAtom(convsAtom)
  const [configs] = useAtom(persistedAppsAtom)
  const [queries] = useAtom(latestRequestAtom)
  const [query] = useAtom(userQueryAtom)
  const [conv] = useAtom(convAtom)

  return () => {
    console.log("useQueryInChat: ", { conv, query })
    if (!conv || !query) return console.error("不满足发送条件")
  }
}

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useQueryOnEnter() {
  const queryInChat = useQueryInChat()
  const [convId] = useAtom(convIdAtom)
  const [configs] = useAtom(persistedAppsAtom)
  const session = useSession()
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpen)
  const addConversation = useAddQueryConv()
  const [query] = useAtom(userQueryAtom)

  return async () => {
    console.log("useQueryOnEnter: ", { convId, query })
    if (!query) return toast.error("不能为空")
    if (!configs.length) return toast.error("至少需要选中一种模型")
    if (session.status !== "authenticated") return setOpen(true)

    // 若此时还没有会话，则先创建会话，并在创建后自动发起请求
    if (!convId) return await addConversation()

    // 否则直接发起请求
    return queryInChat()
  }
}
