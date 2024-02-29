"use client"
import {
  useAddConversationWithoutQuery,
  useConversationListStore,
} from "@/store/conversation-list.slice"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ConversationListComp } from "./conversation-list"

export const Sidebar = () => {
  const conversationList = useConversationListStore((state) => state.data)
  const addConversation = useAddConversationWithoutQuery()
  console.log({ conversationList })

  return (
    <div className={"w-60 shrink-0 p-4 h-full flex flex-col"}>
      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"outline"}
        onClick={addConversation}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      <div className={"grow overflow-auto"}>
        {conversationList.map((basic) => (
          <ConversationListComp basic={basic} key={basic.id} />
        ))}
      </div>
    </div>
  )
}
