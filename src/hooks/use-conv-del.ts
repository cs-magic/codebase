import { api } from "../../packages/common/lib/trpc/react"
import { toast } from "sonner"

/**
 * 用户在会话列表页的展开工具里删除一个会话
 * @param conversationId
 */
export function useDelConv() {
  const delConv = api.core.delConv.useMutation()
  const utils = api.useUtils()

  return (id: string) => {
    void delConv.mutate(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast.error("删除失败！")
        },
        onSuccess: () => {
          utils.core.listConv.invalidate()
        },
      },
    )
  }
}
