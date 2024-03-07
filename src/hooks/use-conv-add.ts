import { appsPersistedAtom } from "@/store/app"
import { useAtom } from "jotai"
import { toast } from "sonner"
import { api } from "../../packages/common/lib/trpc/react"
import { parseApp } from "../../packages/llm/schema"
import { createAppSchema } from "../schema/app.create"

/**
 * 1. 用户在首页query后将自动触发新建一个会话 （包含query、路由）
 * 2. 用户在会话列表可以点击新增一个会话（只包含路由）
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddConv() {
  const [persistedApps] = useAtom(appsPersistedAtom)

  const addConv = api.core.addConv.useMutation()

  const utils = api.useUtils()
  return (title?: string) => {
    // 数据库新增
    return addConv.mutateAsync(
      {
        title,
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
}
