import { useAtom } from "jotai"
import { toast } from "sonner"

import {
  convDetailAtom,
  convIdAtom,
  convsAtom,
  contextAtom,
} from "@/store/conv.atom"
import { persistedAppsAtom, uiSelectAppsDialogOpenAtom } from "@/store/app.atom"
import { useSession } from "next-auth/react"

import {
  uiCheckAuthAlertDialogOpen,
  userPromptAtom,
} from "../../packages/common/store/user"
import { useAddConv } from "@/hooks/use-conv-add"
import { api } from "../../packages/common/lib/trpc/react"

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
  const addConversation = useAddConv()
  const [query] = useAtom(userPromptAtom)
  const [, setSelectAppsOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  return async () => {
    console.log("useQueryOnEnter: ", { convId, query })
    if (!query) return toast.error("不能为空")
    if (!configs.length) {
      setSelectAppsOpen(true)
      toast.error("至少需要选中一种模型")
      return
    }
    if (session.status !== "authenticated") return setOpen(true)

    // 若此时还没有会话，则先创建会话，并在创建后自动发起请求
    if (!convId) return await addConversation()

    // 否则直接发起请求
    return queryInChat()
  }
}

export const useQueryInChat = () => {
  const [convs] = useAtom(convsAtom)
  const [apps] = useAtom(persistedAppsAtom)
  const [context] = useAtom(contextAtom)
  const [prompt] = useAtom(userPromptAtom)
  const [conv] = useAtom(convDetailAtom)
  const [convId] = useAtom(convIdAtom)
  const query = api.queryLLM.query.useMutation()

  return () => {
    console.log("useQueryInChat: ", { convs, conv, convId, prompt })
    if (!conv || !prompt) return console.error("不满足发送条件")

    query.mutate(
      {
        convId: conv.id,
        context: [...context, { content: prompt, role: "user" }],
        apps,
      },
      {
        onError: (err) => {
          console.error(err)
          toast.error("请求失败")
        },
      },
    )
  }
}
