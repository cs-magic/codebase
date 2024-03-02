import { IConversationClient } from "@/schema/conversation"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { conversationStore } from "@/store/conversation"

export const ConversationListComp = ({
  basic,
}: {
  basic: IConversationClient
}) => {
  const deleteConversation = conversationStore.useDelConversation()

  return (
    <Button
      variant={"ghost"}
      className={"w-full justify-start group px-2 gap-1"}
    >
      <Link href={`/tt/${basic.id}`} className={"grow truncate text-left py-2"}>
        {basic.id}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconContainer
            className={"w-6 h-6 shrink-0 invisible group-hover:visible"}
          >
            <MoreHorizontal />
          </IconContainer>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className={"gap-2"}
            onClick={(event) => {
              void deleteConversation(basic.id)
            }}
          >
            <TrashIcon className={"w-4 h-4"} /> 删除会话
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  )
}
