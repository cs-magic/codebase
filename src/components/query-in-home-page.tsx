"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useSnapshot } from "valtio"
import { toast } from "sonner"
import { ArrowUpIcon, Paperclip } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/tooltip"
import { cn } from "@/common/lib/utils"
import { conversationStore } from "@/store/conversation.valtio"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/common/components/ui/alert-dialog"
import { useConvQuery } from "@/hooks/use-query-conv"
import { IconContainer } from "@/common/components/icon-container"
import { TextareaAuto } from "@/common/components/textarea-auto"

export const QueryInHomePage = () => {
  const [input, setInput] = useState("")

  const session = useSession()
  const [open, setOpen] = useState(false)
  const { apps } = useSnapshot(conversationStore)
  const query = useConvQuery()

  const onSubmit = () => {
    console.log({ input })
    if (!input) return
    if (!apps.length) return toast.error("至少需要选中一种模型")
    if (session.status !== "authenticated") return setOpen(true)
    void query(input)
  }

  return (
    <div className={"w-full"}>
      <CheckAuth open={open} setOpen={setOpen} />

      <div className={"flex rounded-3xl border p-2"}>
        <IconContainer className={"w-6 h-6 shrink-0 interactive"}>
          <Paperclip />
        </IconContainer>

        <TextareaAuto
          className={"px-2 grow"}
          autoFocus
          // value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          onQuery={onSubmit}
        />

        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <IconContainer
              className={cn(
                "w-6 h-6 shrink-0",
                input &&
                  "bg-primary-foreground/90 hover:bg-primary-foreground/90 text-white rounded-full",
              )}
              onClick={onSubmit}
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

export const CheckAuth = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogTitle>发送失败</AlertDialogTitle>
      <AlertDialogDescription>您需要先登陆才能发送哦！</AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => signIn()}>
          点击跳转登录
        </AlertDialogAction>
        <AlertDialogCancel>放弃</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)
