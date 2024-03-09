"use client"
import { useAddConv } from "@/hooks/use-conv-add"
import { useDelAllConvs } from "@/hooks/use-conv-del-all"
import { convsAtom } from "@/store/conv"
import { useAtom } from "jotai"
import { MinusIcon, PlusIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { useRouterWithLog } from "../../packages/common-hooks/use-router-with-log"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForConvTitle } from "../hooks/use-llm-for-conv-title"
import { SidebarConvItem } from "./sidebar-conversation"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const [convs] = useAtom(convsAtom)
  const [devEnabled] = useAtom(devEnabledAtom)

  const router = useRouterWithLog()
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
        onClick={async () => {
          const data = await addConv()
          // 路由跳转，并且避免再拿数据
          router.push(`/tt/${data.id}`) // 异步
        }}
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
