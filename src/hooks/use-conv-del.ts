import { coreStore } from "@/store/core.valtio"
import { toast } from "sonner"
import { api } from "../../packages/common-trpc/react"

/**
 * 用户在会话列表页的展开工具里删除一个会话
 * @param conversationId
 */
export function useDelConv() {
  const delConv = api.core.delConv.useMutation()

  return (id: string) => {
    void delConv.mutate(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast.error("删除失败！")
        },
        onSuccess: () => {
          coreStore.delConv(id)
        },
      },
    )
  }
}
