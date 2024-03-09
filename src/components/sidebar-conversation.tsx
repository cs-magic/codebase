"use client"
import { useDelConv } from "@/hooks/use-conv-del"
import { convAtom, convIdAtom } from "@/store/conv"
import { useAtom } from "jotai"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
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
import { IConvBase } from "../schema/conv"
import { getConvUrl } from "../utils"

export const SidebarConvItem = ({ conv }: { conv: IConvBase }) => {
  const [convId] = useAtom(convIdAtom)
  const [convDetail, setConv] = useAtom(convAtom)

  const deleteConv = useDelConv()
  const updateConv = api.core.updateConv.useMutation()

  /**
   * 当前会话用detail，否则用base
   *
   * 虽然在我们支持了convList获取content之后，不需要下面的分支了
   * 但  按道理是没问题的，不知道为啥闪烁，可能应该还是更新的时候出错了
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
