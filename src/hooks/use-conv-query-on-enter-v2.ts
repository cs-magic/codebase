import { appsPersistedAtom, uiSelectAppsDialogOpenAtom } from "@/store/app"
import {
  bestContextAtom,
  convDetailFromServerAtom,
  requestIdAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { api } from "packages/common/lib/trpc/react"
import { toast } from "sonner"
import { llmDelayAtom } from "../../packages/common/store"
import {
  uiCheckAuthAlertDialogOpenAtom,
  userPromptAtom,
} from "../../packages/common/store/user"
import { IMessageInChat } from "../schema/message"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useConvQueryOnEnterV2() {
  let [conv] = useAtom(convDetailFromServerAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpenAtom)
  const [, setSelectAppsOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  const [reqId] = useAtom(requestIdAtom)
  const [context] = useAtom(bestContextAtom)
  const [llmDelay] = useAtom(llmDelayAtom)
  const [prompt, setPrompt] = useAtom(userPromptAtom)

  const router = useRouter()

  const session = useSession()
  const query = api.core.query.useMutation()
  const addConv = api.core.addConv.useMutation()
  const utils = api.useUtils()

  return async () => {
    console.log(ansiColors.red("useQueryOnEnter: "), { query })

    if (!query) return toast.error("不能为空")

    if (!persistedApps.length) {
      setSelectAppsOpen(true)
      toast.error("至少需要选中一种模型")
      return
    }

    if (session.status !== "authenticated") return setOpen(true)

    // 若此时还没有会话，则先创建会话，并在创建后自动发起请求
    if (!conv) {
      conv = await addConv.mutateAsync(
        {
          title: undefined,
          apps: persistedApps,
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

    query.mutate(
      {
        convId: conv.id,
        context: newContext,
        apps: persistedApps,
        llmDelay,
      },
      {
        onSuccess: (requestIdNew) => {
          // 重置以拿到最新的数据
          void utils.core.getConv.invalidate()

          router.push(`/tt/${conv!.id}?r=${requestIdNew}`)

          console.log(
            ansiColors.red(
              `[useConvQuery] req-id: ${reqId} --> ${requestIdNew} `,
            ),
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
