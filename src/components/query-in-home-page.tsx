"use client"

import { conversationsState, useQueryInHomePage } from "@/store/conversation"
import { Textarea } from "@/components/textarea"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useSnapshot } from "valtio"
import { toast } from "sonner"
import { IconContainer } from "@/components/containers"
import { ArrowUpIcon, Paperclip } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { CheckAuth } from "./auth"

export const QueryInHomePage = () => {
  const [input, setInput] = useState("")

  const { queryInHomePage } = useQueryInHomePage()

  const session = useSession()
  const [open, setOpen] = useState(false)
  const { pApps } = useSnapshot(conversationsState)

  const onSubmit = () => {
    console.log({ input })
    if (!input) return
    if (!pApps.length) return toast.error("至少需要选中一种模型")
    if (session.status !== "authenticated") return setOpen(true)
    void queryInHomePage(input)
  }

  return (
    <div className={"w-full"}>
      <CheckAuth open={open} setOpen={setOpen} />

      <div className={"flex rounded-3xl border p-2"}>
        <IconContainer className={"w-6 h-6 shrink-0 interactive"}>
          <Paperclip />
        </IconContainer>

        <Textarea
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
