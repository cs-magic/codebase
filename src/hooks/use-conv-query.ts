import { getTriggerID } from "@/lib/utils"
import { IMessageInChat } from "@/schema/message"
import { appIdPersistedAtom, appsPersistedAtom } from "@/store/app"

import { convDetailAtom } from "@/store/conv"
import {
  appsShouldSSEPersistedAtom,
  contextAtom,
  requestIdPersistedAtom,
} from "@/store/request"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { toast } from "sonner"
import { api } from "../../packages/common/lib/trpc/react"

import { userPromptAtom } from "../../packages/common/store/user"

export const useConvQuery = () => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)
  const [conv, setConv] = useAtom(convDetailAtom)
  const [, setAppsShouldSSE] = useAtom(appsShouldSSEPersistedAtom)

  const [reqId, setRequestID] = useAtom(requestIdPersistedAtom)
  const [appId] = useAtom(appIdPersistedAtom)

  const query = api.queryLLM.query.useMutation()

  const [context2] = useAtom(contextAtom)

  return () => {
    console.log(ansiColors.red("[useConvQuery] inner "), {
      conv,
      reqId,
      appId,
      context2,
    })
    if (!conv || !prompt) return console.error("不满足发送条件")

    setPrompt("") // reset

    const newContext = [
      ...context2,
      { content: prompt, role: "user" },
    ] as IMessageInChat[]

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
