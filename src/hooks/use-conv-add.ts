import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSnapshot } from "valtio"
import { parseApp } from "../../packages/common-llm/schema"
import { api } from "../../packages/common-trpc/react"
import { convStore } from "../store/conv.valtio"

/**
 * 1. 用户在首页query后将自动触发新建一个会话 （包含query、路由）
 * 2. 用户在会话列表可以点击新增一个会话（只包含路由）
 * --
 * 返回 appId，用于其他的函数
 */
export function useAddConv() {
  // const [apps] = useAtom(appsPersistedAtom)
  const { apps } = useSnapshot(convStore)

  const router = useRouter()

  const addConv = api.core.addConv.useMutation()

  const utils = api.useUtils()
  return (title?: string) => {
    // 数据库新增
    return addConv.mutateAsync(
      {
        title,
        apps: apps.map((a) => parseApp(a)),
      },
      {
        onError: () => {
          toast.error("新建会话失败")
        },
        onSuccess: (data) => {
          router.push(`/tt/${data.id}`)
          void utils.core.listConv.invalidate()
          // setConv(data)
        },
      },
    )
  }
}
