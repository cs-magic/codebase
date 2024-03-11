"use client"
import { useDelConv } from "@/hooks/use-conv-del"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"

import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { buttonVariants } from "../../packages/common-ui/shadcn/shadcn-components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/tooltip"
import { cn } from "../../packages/common-ui/shadcn/utils"

import { IConvBase } from "../schema/conv.base"
import { coreStore } from "../store/core.valtio"
import { getConvUrl } from "../utils"

export const SidebarConv = ({ conv }: { conv: IConvBase }) => {
  // const [convId] = useAtom(convIdAtom)
  const { convId } = useSnapshot(coreStore)

  const deleteConv = useDelConv()
  const updateConv = api.core.updateConv.useMutation()

  const ref = useRef<HTMLDivElement>(null)
  const open =
    !ref.current || ref.current.scrollWidth === ref.current.clientWidth
      ? false
      : undefined

  return (
    <Link
      href={getConvUrl(conv)}
      className={cn(
        "w-full justify-start group px-2 my-1 gap-1",
        buttonVariants({ variant: "ghost" }),
        convId === conv.id && "bg-accent/50",
      )}
    >
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <div className={"grow truncate py-2"} ref={ref}>
            {
              // 直接使用 convList 里的标题
              conv.titleResponse?.content ?? "新的对话"
            }
          </div>
        </TooltipTrigger>

        <TooltipContent>{conv.titleResponse?.content}</TooltipContent>
      </Tooltip>

      {/*<InputWithEnter*/}
      {/*  placeholder={"Untitled"}*/}
      {/*  defaultValue={theConv.titleResponse?.content ?? ""}*/}
      {/*  className={cn(*/}
      {/*    "bg-transparent border-none focus-visible:ring-0 cursor-default",*/}
      {/*    convId !== conv.id && "caret-transparent", // 光标透明，这样就不会误以为在输入了，而且主textarea会抢光标的*/}
      {/*  )}*/}
      {/*  onEnter={(content) => {*/}
      {/*    updateConv.mutate(*/}
      {/*      {*/}
      {/*        where: { id: conv.id },*/}
      {/*        data: {*/}
      {/*          titleResponse: {*/}
      {/*            update: {*/}
      {/*              content,*/}
      {/*            },*/}
      {/*          },*/}
      {/*        },*/}
      {/*      },*/}
      {/*      {*/}
      {/*        onSuccess: (data) => {*/}
      {/*          // toast.success(content)*/}
      {/*          utils.core.listConv.invalidate()*/}
      {/*          if (conv.id === convId) setConv(data)*/}
      {/*        },*/}
      {/*      },*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<span hidden={renaming} className={"grow"}>*/}
      {/*  {conv.title ?? "Untitled"}*/}
      {/*</span>*/}

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
