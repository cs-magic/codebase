import { appsPersistedAtom, uiSelectAppsDialogOpenAtom } from "@/store/app"
import {
  bestContextAtom,
  convAtom,
  responseFinishedAtom,
  responsesAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getNewId } from "../../packages/common-algo/id"
import { parseApp } from "../../packages/common-llm/schema"
import { llmDelayAtom } from "../../packages/common-llm/store"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { api } from "../../packages/common-trpc/react"
import { IMessageInChat } from "../schema/message"
import { uiCheckAuthAlertDialogOpenAtom } from "../store/auth"
import { userPromptAtom } from "../store/query"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useConvQuery() {
  let [conv] = useAtom(convAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpenAtom)
  const [, setSelectAppsOpen] = useAtom(uiSelectAppsDialogOpenAtom)
  const [context] = useAtom(bestContextAtom)
  const [llmDelay] = useAtom(llmDelayAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)
  const [responses] = useAtom(responsesAtom)
  const [responseFinished] = useAtom(responseFinishedAtom)
  const [pusherServerId] = useAtom(pusherServerIdAtom)

  const router = useRouter()
  const session = useSession()
  const query = api.core.query.useMutation()
  const addConv = api.core.addConv.useMutation()
  const utils = api.useUtils()

  return async () => {
    console.log(ansiColors.red("useQueryOnEnter: "), {
      query,
      responses,
      responseFinished,
    })

    if (!responseFinished) {
      console.log({ responses })
      return toast.warning("等待流完成")
    }

    if (!query) return toast.warning("不能为空")

    if (!persistedApps.length) {
      setSelectAppsOpen(true)
      return toast.warning("至少需要选中一种模型")
    }

    if (session.status !== "authenticated") {
      setOpen(true)
      return toast.warning("请登录")
    }

    // 若此时还没有会话，则先创建会话，并在创建后自动发起请求
    if (!conv) {
      conv = await addConv.mutateAsync(
        {
          title: undefined,
          apps: persistedApps.map((a) => parseApp(a)),
        },
        {
          onError: () => {
            toast.error("新建会话失败")
          },
          onSuccess: (data) => {
            void utils.core.listConv.invalidate()
          },
        },
      )
    }

    // 否则直接发起请求
    setPrompt("") // reset

    const newContext = [
      ...context,
      { content: prompt, role: "user" },
    ] as IMessageInChat[]

    const requestId = getNewId()

    query.mutate(
      {
        requestId,
        convId: conv.id,
        context: newContext,
        apps: persistedApps.map((a) => parseApp(a)),
        llmDelay,
        pusherServerId,
      },
      {
        onSuccess: (requestIdNew) => {
          // todo: validate necessary 重置以拿到最新的数据
          void utils.core.getConv.invalidate()

          //   todo: is requestId update too late, causing no `init` event?
          router.push(`/tt/${conv!.id}?r=${requestId}`)
        },
        onError: (err) => {
          console.error(err)
          toast.error("请求失败")
        },
      },
    )
  }
}
