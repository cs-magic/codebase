import { useRouter } from "next/navigation"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { useAddConv } from "../hooks/use-conv-add"
import { coreStore } from "../store/core.valtio"
import { PlusIcon } from "lucide-react"

export const SidebarCreateConv = () => {
  const router = useRouter()
  const addConv = useAddConv()
  const addConvInSidebar = async () => {
    const conv = await addConv()
    coreStore.addConvFromServer(conv)
    void router.push(`/tt/${conv.id}`)
  }

  return (
    <Button
      className={"w-full gap-2 my-2 shrink-0"}
      variant={"outline"}
      onClick={addConvInSidebar}
    >
      <PlusIcon className={"w-4 h-4"} />
      新建会话
    </Button>
  )
}
