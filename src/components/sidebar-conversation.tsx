"use client"
import { useDelConv } from "@/hooks/use-conv-del"
import { convIdAtom } from "@/store/conv"
import { useAtom } from "jotai"
import { MoreHorizontal, PenIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { IconContainer } from "../../packages/common/components/icon-container"
import { InputWithEnter } from "../../packages/common/components/input"
import { buttonVariants } from "../../packages/common/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../packages/common/components/ui/dropdown-menu"
import { api } from "../../packages/common/lib/trpc/react"
import { cn } from "../../packages/common/lib/utils"

export const SidebarConversationItem = ({
  conv,
}: {
  conv: { id: string; title: string | null }
}) => {
  const [convId] = useAtom(convIdAtom)

  const deleteConv = useDelConv()
  const updateConv = api.core.updateConv.useMutation()

  const [renaming, setRenaming] = useState(false)

  return (
    <Link
      href={`/tt/${conv.id}`}
      className={cn(
        "w-full justify-start group px-2 my-1 gap-1",
        buttonVariants({ variant: "ghost" }),
        convId === conv.id && "bg-accent/50",
      )}
    >
      {renaming ? (
        <InputWithEnter
          placeholder={"Untitled"}
          defaultValue={conv.title ?? ""}
          className={cn(
            "bg-transparent border-none focus-visible:ring-0",
            convId !== conv.id && "cursor-pointer",
          )}
          onEnter={(title) => {
            updateConv.mutate({
              where: { id: conv.id },
              data: { title },
            })
          }}
        />
      ) : (
        <span className={"grow"}>{conv.title ?? "Untitled"}</span>
      )}

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
              event.preventDefault()
              setRenaming(true)
            }}
          >
            <PenIcon className={"w-4 h-4"} /> 重命名
          </DropdownMenuItem>

          <DropdownMenuItem
            className={"gap-2"}
            onClick={(event) => {
              event.preventDefault()
              void deleteConv(conv.id)
            }}
          >
            <TrashIcon className={"w-4 h-4"} /> 删除会话
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  )
}
