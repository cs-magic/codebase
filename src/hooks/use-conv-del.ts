import { useRouter } from "next/navigation"
import { useAtom } from "jotai/index"
import { convsAtom } from "@/store/conv.atom"
import { api } from "../../packages/common/lib/trpc/react"
import { toast } from "sonner"

/**
 * 用户在会话列表页的展开工具里删除一个会话
 * @param conversationId
 */
export function useDelConv() {
  const delConv = api.queryLLM.delConv.useMutation()
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
          utils.queryLLM.listConv.invalidate()
        },
      },
    )
  }
}

export const useDelAllConvs = () => {
  const router = useRouter()
  const utils = api.useUtils()

  const delAllConvs = api.queryLLM.delAllConvs.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("删除失败！")
    },
    onSuccess: (data) => {
      utils.queryLLM.listConv.invalidate()
      console.log("deleted all: ", { data })
      router.push("/tt")
    },
  })
  return () => delAllConvs.mutate()
}
