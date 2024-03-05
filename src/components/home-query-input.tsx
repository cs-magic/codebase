"use client"

import { useAtom } from "jotai"
import { userPromptAtom } from "../../packages/common/store/user"
import { IconContainer } from "../../packages/common/components/icon-container"
import { ArrowUpIcon, Paperclip } from "lucide-react"
import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../packages/common/components/ui/tooltip"
import { cn } from "../../packages/common/lib/utils"
import { useConvQueryOnEnter } from "@/hooks/use-conv-query-on-enter"

export const HomeQueryInput = () => {
  const query = useConvQueryOnEnter()
  const [prompt] = useAtom(userPromptAtom)

  return (
    <div className={"grow flex rounded-3xl border p-2"}>
      <IconContainer className={"w-6 h-6 shrink-0 interactive"}>
        <Paperclip />
      </IconContainer>

      <TextareaAuto
        className={"px-2 grow"}
        autoFocus
        // value={input}
        onQuery={query}
      />

      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <IconContainer
            className={cn(
              "w-6 h-6 shrink-0",
              prompt &&
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
  )
}
