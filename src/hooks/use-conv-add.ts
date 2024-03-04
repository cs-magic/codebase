import { useRouter } from "next/navigation"
import { api } from "../../packages/common/lib/trpc/react"
import { toast } from "sonner"
import { useAtom } from "jotai"

import { persistedAppsAtom } from "@/store/app.persisted"

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddConv() {
  const router = useRouter()
  const addConv = api.queryLLM.addConv.useMutation()
  const [persistedApps] = useAtom(persistedAppsAtom)

  const utils = api.useUtils()
  return (title?: string) => {
    // 数据库新增
    return addConv.mutateAsync(
      {
        title,
        apps: persistedApps,
      },
      {
        onError: () => {
          toast.error("新建会话失败")
        },
        onSuccess: (data) => {
          utils.queryLLM.listConv.invalidate()
          // 路由跳转，并且避免再拿数据
          router.push(`/tt/${data.id}`) // 异步
        },
      },
    )
  }
}
