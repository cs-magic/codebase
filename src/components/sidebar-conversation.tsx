"use client"
import { useDelConv } from "@/hooks/use-conv-del"
import { convIdAtom, serverConvDetailAtom } from "@/store/conv"
import { produce } from "immer"
import { useAtom } from "jotai"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { toast } from "sonner"

import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { InputWithEnter } from "../../packages/common-ui/components/input"
import { buttonVariants } from "../../packages/common-ui/shadcn/shadcn-components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/dropdown-menu"
import { api } from "../../packages/common-trpc/react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/tooltip"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IConvBase } from "../schema/conv"
import { Label } from "packages/common-ui/shadcn/shadcn-components/label"

export const SidebarConvItem = ({ conv }: { conv: IConvBase }) => {
  const [convId] = useAtom(convIdAtom)
  const [convDetail, setConv] = useAtom(serverConvDetailAtom)

  const deleteConv = useDelConv()
  const updateConv = api.core.updateConv.useMutation()

  /**
   * 当前会话用detail，否则用base
   */
  const theConv = convDetail?.id === conv.id ? convDetail : conv
  const utils = api.useUtils()

  const ref = useRef<HTMLDivElement>(null)
  const open =
    !ref.current || ref.current.scrollWidth === ref.current.clientWidth
      ? false
      : undefined

  return (
    <Link
      href={`/tt/${conv.id}`}
      className={cn(
        "w-full justify-start group px-2 my-1 gap-1",
        buttonVariants({ variant: "ghost" }),
        convId === conv.id && "bg-accent/50",
      )}
    >
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <div className={"grow truncate py-2"} ref={ref}>
            {theConv.titleResponse?.content ?? "Untitled"}
          </div>
        </TooltipTrigger>

        <TooltipContent>{theConv.titleResponse?.content}</TooltipContent>
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
