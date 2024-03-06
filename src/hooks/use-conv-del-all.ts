import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"
import { api } from "../../packages/common/lib/trpc/react"
import { toast } from "sonner"

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
      console.log(ansiColors.blue(`router push --> /tt`))
      router.push("/tt")
    },
  })
  return () => delAllConvs.mutate()
}
