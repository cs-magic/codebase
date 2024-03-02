"use client"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { ConversationListComp } from "./sidebar-conversation-item"
import { useSnapshot } from "valtio"
import {
  conversationStore,
  useAddConversation,
  useDeleteAllConversations,
} from "@/store/conversation"

export const Sidebar = () => {
  const { conversations } = useSnapshot(conversationStore)
  const addConversation = useAddConversation()
  const deleteAllConversations = useDeleteAllConversations()

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

      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"destructive"}
        onClick={deleteAllConversations}
      >
        <MinusIcon className={"w-4 h-4"} />
        清空会话
      </Button>

      <div className={"grow overflow-auto"}>
        {conversations.map((conversation) => (
          <ConversationListComp
            conversation={conversation}
            key={conversation.id}
          />
        ))}
      </div>
    </div>
  )
}
