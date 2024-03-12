import ansiColors from "ansi-colors"
import { useAtom, useSetAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSnapshot } from "valtio"
import { parseApp } from "../../packages/common-llm/schema"
import {
  convSummaryPromptAtom,
  llmDelayAtom,
} from "../../packages/common-llm/store"
import { pusherServerIdAtom } from "../../packages/common-pusher/store"
import { api } from "../../packages/common-trpc/react"
import { IMessageInChat } from "../schema/message"
import { coreStore } from "../store/core.valtio"

import { userInputAtom } from "../store/system.atom"
import {
  checkAuthAlertDialogOpenAtom,
  selectAppsDialogOpenAtom,
} from "../store/ui.atom"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useConvQuery() {
  const [llmDelay] = useAtom(llmDelayAtom)
  const [pusherServerId] = useAtom(pusherServerIdAtom)
  const [convSummaryPrompt] = useAtom(convSummaryPromptAtom)
  const setOpen = useSetAtom(checkAuthAlertDialogOpenAtom)
  const setSelectAppsOpen = useSetAtom(selectAppsDialogOpenAtom)
  const setPrompt = useSetAtom(userInputAtom)

  const { apps, responding, chatId, bestContext, chats, baseConv } =
    useSnapshot(coreStore)

  const router = useRouter()
  const session = useSession()
  const query = api.core.query.useMutation()
  const addConv = api.core.addConv.useMutation()

  return async (prompt: string) => {
    console.log(ansiColors.red("useQueryOnEnter: "), {
      query,
      responding,
    })

    if (responding) {
      return toast.warning("等待流完成")
    }

    if (!query) return toast.warning("query 不能为空")

    // if (!appClientId) return toast.warning("app 不能为空")

    if (!apps.length) {
      setSelectAppsOpen(true)
      return toast.warning("至少需要选中一种模型")
    }

    if (session.status !== "authenticated") {
      setOpen(true)
      return toast.warning("请登录")
    }

    // todo: mutate optimization
    // 若此时还没有会话，则先创建会话，并在创建后自动发起请求
    if (!coreStore.conv) {
      const conv = await addConv.mutateAsync({
        title: undefined,
      })
      // 直接本地刷新
      coreStore.addConvFromServer(conv)
      coreStore.initConvFromServer(conv)
    }

    // 否则直接发起请求
    setPrompt("") // reset

    const newContext = [
      ...bestContext,
      { content: prompt, role: "user" },
    ] as IMessageInChat[]

    const shouldConvTitle = !baseConv?.titleResponse?.content

    query.mutate(
      {
        // app-response
        context: newContext,
        appsWithChat: chats.map((chat) => ({
          ...parseApp(chat.app!),
          chatId: chat.id,
        })),
        convId: coreStore.convId!,
        options: {
          llmDelay,
          pusherServerId,
        },
        // conv-title
        withConv: shouldConvTitle
          ? {
              bestChatId: chatId!,
              systemPromptForConvTitle: convSummaryPrompt,
            }
          : undefined,
      },
      {
        onSuccess: async (request) => {
          // local update
          coreStore.updateRequestFromServer(request)

          router.push(`/tt/${request.convId}?r=${request.id}`)
        },
        onError: (err) => {
          console.error(err)
          toast.error("请求失败")
        },
      },
    )
  }
}
