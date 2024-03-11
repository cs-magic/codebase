"use client"
import { useAddConv } from "@/hooks/use-conv-add"
import { useDelAllConvs } from "@/hooks/use-conv-del-all"
import { useAtom } from "jotai"
import { MinusIcon, PlusIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import { useSnapshot } from "valtio"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForConvTitle } from "../hooks/use-llm-for-conv-title"
import { convStore } from "../store/conv.valtio"
import { SidebarConvItem } from "./sidebar-conversation"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const [devEnabled] = useAtom(devEnabledAtom)

  const { convs } = useSnapshot(convStore)
  // const [convs] = useAtom(convsAtom)

  const addConv = useAddConv()
  const delAllConvs = useDelAllConvs()

  useLLMForConvTitle()

  return (
    <div
      className={cn(
        "hidden sm:w-60 shrink-0 p-4 h-full sm:flex flex-col",
        className,
      )}
      {...props}
    >
      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"outline"}
        onClick={() => addConv()}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      {devEnabled && (
        <Button
          className={"w-full gap-2 my-2 shrink-0"}
          variant={"destructive"}
          onClick={delAllConvs}
        >
          <MinusIcon className={"w-4 h-4"} />
          清空会话
        </Button>
      )}

      <div className={"grow overflow-auto"}>
        {convs.map((conv) => (
          <SidebarConvItem conv={conv} key={conv.id} />
        ))}
      </div>
    </div>
  )
}
