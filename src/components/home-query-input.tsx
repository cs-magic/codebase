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
    <div className={"grow flex rounded-3xl border p-2 my-8"}>
      <IconContainer className={"shrink-0"} tooltipContent={"附件（待开发）"}>
        <Paperclip />
      </IconContainer>

      <TextareaAuto className={"px-2 grow"} autoFocus onQuery={query} />

      <IconContainer
        tooltipContent={"发送"}
        className={cn(
          "shrink-0",
          prompt &&
            "bg-primary-foreground/90 hover:bg-primary-foreground/90 text-white rounded-full",
        )}
        onClick={query}
      >
        <ArrowUpIcon className={cn()} />
      </IconContainer>
    </div>
  )
}
