import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useAtomValue } from "jotai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { parseApp } from "../../packages/common-llm/schema"
import {
  convSummaryPromptAtom,
  llmDelayAtom,
} from "../../packages/common-llm/store"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { api } from "../../packages/common-trpc/react"
import { IMessageInChat } from "../schema/message"
import { uiSelectAppsDialogOpenAtom } from "../store/app.atom"
import { uiCheckAuthAlertDialogOpenAtom } from "../store/auth"
import { convAtomStore } from "../store/conv.store"
import { userPromptAtom } from "../store/query"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useConvQuery() {
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpenAtom)
  const [, setSelectAppsOpen] = useAtom(uiSelectAppsDialogOpenAtom)
  const [llmDelay] = useAtom(llmDelayAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)
  const [pusherServerId] = useAtom(pusherServerIdAtom)
  const [convSummaryPrompt] = useAtom(convSummaryPromptAtom)

  // let [conv] = useAtom(convAtom)
  // const [apps] = useAtom(appsPersistedAtom)
  // const [appId] = useAtom(appIdPersistedAtom)
  // const [context] = useAtom(bestContextAtom)
  // const [responses] = useAtom(responsesAtom)
  // const [responseFinished] = useAtom(responseFinishedAtom)

  // let conv = useConvStore.use.conv()
  // const apps = useConvStore.use.apps()
  // const appIndex = useConvStore.use.appIndex()
  // const appId = useConvStore.use.appId()
  // const bestContext = useConvStore.use.bestContext()
  // const responses = useConvStore.use.responses()
  // const responding = useConvStore.use.responding()

  const { apps, appIndex, appId, bestContext, responses, responding } =
    useAtomValue(convAtomStore)
  // useSnapshot(convStore)
  let { conv } = useAtomValue(convAtomStore)
  // useSnapshot(convStore)

  const router = useRouter()
  const session = useSession()
  const query = api.core.query.useMutation()
  const addConv = api.core.addConv.useMutation()
  const utils = api.useUtils()

  return async () => {
    console.log(ansiColors.red("useQueryOnEnter: "), {
      conv,
      query,
      responses,
      context: bestContext,
      apps,
      appIndex,
      appId,
      responding,
    })

    if (responding) {
      console.log({ responses })
      return toast.warning("等待流完成")
    }

    if (!query) return toast.warning("query 不能为空")

    if (!appId) return toast.warning("app 不能为空")

    if (!apps.length) {
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
          apps: apps.map(parseApp),
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
      ...bestContext,
      { content: prompt, role: "user" },
    ] as IMessageInChat[]

    query.mutate(
      {
        convId: conv.id,
        context: newContext,
        apps: apps.map(parseApp),
        llmDelay,
        pusherServerId,
        bestAppId: appId,
        systemPromptForConvTitle: convSummaryPrompt,
      },
      {
        onSuccess: async (requestId) => {
          // 服务器上路由跳转很快，所以我们要先确保数据重置完
          await utils.core.getConv.invalidate()
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
