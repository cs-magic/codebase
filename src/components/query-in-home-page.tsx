"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { ArrowUpIcon, Paperclip } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../packages/common/components/ui/tooltip"
import { cn } from "../../packages/common/lib/utils"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../packages/common/components/ui/alert-dialog"
import { useQueryOnEnter } from "@/hooks/use-conv-query"
import { IconContainer } from "../../packages/common/components/icon-container"
import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import { useAtom } from "jotai"

import { uiCheckAuthAlertDialogOpen } from "../../packages/common/store/user"

export const QueryInHomePage = () => {
  const [input, setInput] = useState("")
  const query = useQueryOnEnter()

  return (
    <div className={"w-full"}>
      <CheckAuth />

      <div className={"flex rounded-3xl border p-2"}>
        <IconContainer className={"w-6 h-6 shrink-0 interactive"}>
          <Paperclip />
        </IconContainer>

        <TextareaAuto
          className={"px-2 grow"}
          autoFocus
          // value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          onQuery={query}
        />

        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <IconContainer
              className={cn(
                "w-6 h-6 shrink-0",
                input &&
                  "bg-primary-foreground/90 hover:bg-primary-foreground/90 text-white rounded-full",
              )}
              onClick={query}
            >
              <ArrowUpIcon className={cn()} />
            </IconContainer>
          </TooltipTrigger>

          <TooltipContent side={"bottom"}>发送</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export const CheckAuth = () => {
  const [open, setOpen] = useAtom(uiCheckAuthAlertDialogOpen)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>发送失败</AlertDialogTitle>
        <AlertDialogDescription>
          您需要先登陆才能发送哦！
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => signIn()}>
            点击跳转登录
          </AlertDialogAction>
          <AlertDialogCancel>放弃</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
