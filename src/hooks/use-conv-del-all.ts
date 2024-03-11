import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "../../packages/common-trpc/react"
import { core } from "../store/core.valtio"

export const useDelAllConvs = () => {
  const router = useRouter()

  const delAllConvs = api.core.delAllConvs.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("删除失败！")
    },
    onSuccess: (data) => {
      core.delAllConvs()
      router.push("/tt")
    },
  })
  return () => delAllConvs.mutate()
}
