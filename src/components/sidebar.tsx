"use client"
import { useRouter } from "next/navigation"
import { Button } from "../../packages/common/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { SidebarConversationItem } from "./sidebar-conversation"
import { useAtom } from "jotai"
import { convsFromServerAtom, requestIdAtom } from "@/store/conv"
import { useAddConv } from "@/hooks/use-conv-add"
import { useDelAllConvs } from "@/hooks/use-conv-del-all"

export const Sidebar = () => {
  const [conversations] = useAtom(convsFromServerAtom)
  const [, setRequestId] = useAtom(requestIdAtom)

  const router = useRouter()
  const addConversation = useAddConv()
  const deleteAllConversations = useDelAllConvs()

  return (
    <div className={"hidden sm:w-60 shrink-0 p-4 h-full sm:flex flex-col"}>
      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"outline"}
        onClick={async () => {
          const data = await addConversation()
          setRequestId(null)
          // 路由跳转，并且避免再拿数据
          router.push(`/tt/${data.id}`) // 异步
        }}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      {process.env.NODE_ENV !== "production" && (
        <Button
          className={"w-full gap-2 my-2 shrink-0"}
          variant={"destructive"}
          onClick={deleteAllConversations}
        >
          <MinusIcon className={"w-4 h-4"} />
          清空会话
        </Button>
      )}

      <div className={"grow overflow-auto"}>
        {conversations.map((conversation) => (
          <SidebarConversationItem conv={conversation} key={conversation.id} />
        ))}
      </div>
    </div>
  )
}
