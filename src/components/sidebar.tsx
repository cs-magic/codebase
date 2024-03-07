"use client"
import { useAddConv } from "@/hooks/use-conv-add"
import { useDelAllConvs } from "@/hooks/use-conv-del-all"
import { serverConvListFAtom } from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { HTMLAttributes } from "react"
import { Button } from "../../packages/common/components/ui/button"
import { cn } from "../../packages/common/lib/utils"
import { devEnabledAtom } from "../../packages/common/store"
import { SidebarConvItem } from "./sidebar-conversation"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const [convs] = useAtom(serverConvListFAtom)
  const [devEnabled] = useAtom(devEnabledAtom)

  const router = useRouter()
  const addConv = useAddConv()
  const delAllConvs = useDelAllConvs()

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
          console.log(ansiColors.blue(`router push --> /tt/${data.id}`))
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
