import { Button, buttonVariants } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDelConversation } from "@/store/conversation"
import { cn } from "@/lib/utils"

export const ConversationListComp = ({
  conversation,
}: {
  conversation: { id: string }
}) => {
  const deleteConversation = useDelConversation()

  return (
    <div
      className={cn(
        "w-full justify-start group px-2 gap-1",
        buttonVariants({ variant: "ghost" }),
      )}
    >
      <Link
        href={`/tt/${conversation.id}`}
        className={"grow truncate text-left py-2"}
      >
        {conversation.id}
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
              void deleteConversation(conversation.id)
            }}
          >
            <TrashIcon className={"w-4 h-4"} /> 删除会话
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
