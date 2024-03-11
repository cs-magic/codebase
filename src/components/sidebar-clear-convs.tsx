import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { useDelAllConvs } from "../hooks/use-conv-del-all"
import { MinusIcon } from "lucide-react"

export const SidebarClearConvs = () => {
  const [devEnabled] = useAtom(devEnabledAtom)

  const delAllConvs = useDelAllConvs()

  if (!devEnabled) return null

  return (
    <Button
      className={"w-full gap-2 my-2 shrink-0"}
      variant={"destructive"}
      onClick={delAllConvs}
    >
      <MinusIcon className={"w-4 h-4"} />
      清空会话
    </Button>
  )
}
