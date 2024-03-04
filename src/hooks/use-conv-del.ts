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
  const [, setConvs] = useAtom(convsAtom)

  return (id: string) => {
    void delConv.mutate(
      { id },
      {
        onError: (error) => {
          console.error(error)
          toast.error("删除失败！")
        },
        onSuccess: () => {
          // 单删和多删都会导致自己受影响，所以去hook里写收尾动作
          setConvs((cs) => cs.filter((c) => c.id !== id))
        },
      },
    )
  }
}

export const useDelAllConvs = () => {
  const router = useRouter()
  const [, setConvs] = useAtom(convsAtom)

  const delAllConvs = api.queryLLM.delAllConvs.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("删除失败！")
    },
    onSuccess: (data) => {
      console.log("deleted all: ", { data })
      setConvs([])
      router.push("/tt")
    },
  })
  return () => delAllConvs.mutate()
}
