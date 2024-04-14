import { ComponentProps, forwardRef } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../packages/common-ui-shadcn/components/tooltip"
import { cn } from "../../../packages/common-ui-shadcn/utils"

export const IconContainer = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof TooltipTrigger> & {
    size?: "sm" | "lg"
    tooltipContent?: string
  }
>(({ className, size, tooltipContent, ...props }, ref) => {
  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger
        ref={ref}
        className={cn(
          // 外部6，内部4是最佳的小图标比例
          " w-6 h-6",
          size === "lg" && "w-8 h-8",
          " p-1 [&>*]:w-full [&>*]:h-full center",
          "cursor-pointer",
          // "hover:bg-muted",
          className,
        )}
        {...props}
      />

      {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
    </Tooltip>
  )
})
IconContainer.displayName = "IconContainer"
