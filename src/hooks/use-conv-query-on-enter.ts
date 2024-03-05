import { useAtom } from "jotai"
import { convIdAtom } from "@/store/conv"
import { appsPersistedAtom, uiSelectAppsDialogOpenAtom } from "@/store/app"
import { useSession } from "next-auth/react"
import {
  uiCheckAuthAlertDialogOpenAtom,
  userPromptAtom,
} from "../../packages/common/store/user"
import { useAddConv } from "@/hooks/use-conv-add"
import { toast } from "sonner"
import { useConvQuery } from "@/hooks/use-conv-query"

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useConvQueryOnEnter() {
  const queryInChat = useConvQuery()
  const [convId] = useAtom(convIdAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const session = useSession()
  const [, setOpen] = useAtom(uiCheckAuthAlertDialogOpenAtom)
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
