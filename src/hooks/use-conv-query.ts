import { useAtom } from "jotai"
import { toast } from "sonner"

import { convIdAtom, convsAtom } from "@/store/conv"
import { uiSelectAppsDialogOpenAtom } from "@/store/app"
import { useSession } from "next-auth/react"

import {
  uiCheckAuthAlertDialogOpen,
  userPromptAtom,
} from "../../packages/common/store/user"
import { useAddConv } from "@/hooks/use-conv-add"
import { api } from "../../packages/common/lib/trpc/react"
import { currentContextAtom, requestAtom } from "@/store/request"
import { IMessageInChat } from "@/schema/message"
import {
  persistedAppsAtom,
  persistedSelectedAppIDAtom,
} from "@/store/app.persisted"
import { appsShouldSSEAtom, requestIDAtom } from "@/store/request.persisted"
import { convDetailAtom } from "@/store/conv.immer"
import { getTriggerID } from "@/lib/utils"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useQueryOnEnter() {
  const queryInChat = useQueryInChat()
  const [convId] = useAtom(convIdAtom)
  const [persistedApps] = useAtom(persistedAppsAtom)
  const session = useSession()
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpen)
  const addConversation = useAddConv()
  const [query] = useAtom(userPromptAtom)
  const [, setSelectAppsOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  return async () => {
    console.log("useQueryOnEnter: ", { convId, query })
    if (!query) return toast.error("不能为空")
    if (!persistedApps.length) {
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
  const [persistedApps] = useAtom(persistedAppsAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)
  const [conv, setConv] = useAtom(convDetailAtom)
  const [, setRequestID] = useAtom(requestIDAtom)
  const [, setAppsShouldSSE] = useAtom(appsShouldSSEAtom)

  const [currentContext] = useAtom(currentContextAtom)

  const [request] = useAtom(requestAtom)

  const query = api.queryLLM.query.useMutation()

  const contextInRequest = request?.context ?? []
  const [selectedAppId] = useAtom(persistedSelectedAppIDAtom)
  const responseInRequest = request?.responses.find(
    (r) => r.appId === selectedAppId,
  )?.response

  return () => {
    if (!conv || !prompt) return console.error("不满足发送条件")
    setPrompt("") // reset
    const newContext = [
      ...currentContext,
      { content: prompt, role: "user" },
    ] as IMessageInChat[]
    console.log("querying: ", {
      convId: conv.id,
      newContext,
      persistedApps,
      request,
      selectedAppId,
      contextInRequest,
      responseInRequest,
      currentContext,
    })

    query.mutate(
      {
        convId: conv.id,
        context: newContext,
        apps: persistedApps,
      },
      {
        onSuccess: (request) => {
          // todo: invalidate also ?
          // 更新request
          setConv((conv) => {
            // console.log("-- update request: ", { conv, request })
            conv?.requests?.push(request)
          })

          // todo: derived
          // 更新request id
          setRequestID(request.id)

          // 添加到请求池
          setAppsShouldSSE((old) => [
            ...old,
            ...persistedApps.map((app) => getTriggerID(request.id, app.id)),
          ])
        },
        onError: (err) => {
          console.error(err)
          toast.error("请求失败")
        },
      },
    )
  }
}
