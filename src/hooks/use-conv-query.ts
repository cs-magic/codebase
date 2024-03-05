import { IMessageInChat } from "@/schema/message"
import { appIdPersistedAtom, appsPersistedAtom } from "@/store/app"

import {
  contextAtom,
  convDetailFromServerAtom,
  requestIdAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "../../packages/common/lib/trpc/react"

import { userPromptAtom } from "../../packages/common/store/user"

export const useConvQuery = () => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)
  const [conv, setConv] = useAtom(convDetailFromServerAtom)
  const [reqId, setRequestID] = useAtom(requestIdAtom)
  const [appId] = useAtom(appIdPersistedAtom)
  const [context] = useAtom(contextAtom)

  const utils = api.useUtils()
  const query = api.core.query.useMutation()

  const router = useRouter()

  return () => {
    console.log(ansiColors.red("[useConvQuery] inner "), {
      conv,
      reqId,
      appId,
      context,
    })
    if (!conv || !prompt) return console.error("不满足发送条件")

    setPrompt("") // reset

    const newContext = [
      ...context,
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
          // 重置以拿到最新的数据
          utils.core.getConv.invalidate()

          const reqIdNew = request.id
          router.push(`?r=${reqIdNew}`)

          console.log(
            ansiColors.red(`[useConvQuery] req-id: ${reqId} --> ${reqIdNew} `),
          )
        },
        onError: (err) => {
          console.error(err)
          toast.error("请求失败")
        },
      },
    )
  }
}
