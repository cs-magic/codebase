import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "../../packages/common-trpc/react"

export const useDelAllConvs = () => {
  const router = useRouter()
  const utils = api.useUtils()

  const delAllConvs = api.core.delAllConvs.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("删除失败！")
    },
    onSuccess: (data) => {
      void utils.core.listConv.invalidate()
      console.log("deleted all: ", { data })
      router.push("/tt")
    },
  })
  return () => delAllConvs.mutate()
}
