"use client"

import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type Orientation = "horizontal" | "vertical"

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { orientation?: Orientation }
>(({ className, orientation, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        "p-2 sm:p-4",
        "flex gap-2 sm:gap-4 items-center justify-center",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  )
})
Container.displayName = "Container"

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
          "cursor-pointer hover:bg-muted",
          className,
        )}
        {...props}
      />

      {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
    </Tooltip>
  )
})
IconContainer.displayName = "IconContainer"

export const SeparatorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={"w-full flex items-center justify-center overflow-hidden"}>
      <Separator orientation={"horizontal"} className={"grow"} />
      <div className={" text-xs text-muted-foreground shrink-0 mx-4"}>
        {children}
      </div>
      <Separator orientation={"horizontal"} className={"grow"} />
    </div>
  )
}

export const AuthContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        "grow w-full flex items-center justify-center gap-4 bg-muted p-4"
      }
    >
      <div
        className={
          "rounded-lg w-full sm:w-[480px] p-8 bg-background flex flex-col items-center gap-8"
        }
      >
        <div className={"rounded-lg w-full"}>{children}</div>

        <div className={"text-xs text-muted-foreground mt-8"}>
          由
          <Link
            className={"font-semibold mx-1"}
            href={"https://cs-magic.cn"}
            target={"_blank"}
          >
            魔法社
          </Link>
          提供安全支持
        </div>
      </div>
    </div>
  )
}

export const DigitContainer = ({
  className,
  maxLength,
  focus,
  ...props
}: ComponentProps<typeof Input> & { focus: boolean }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!focus || !ref.current) return

    ref.current.focus()
  }, [focus])

  return (
    <Input
      ref={ref}
      className={cn(
        "w-8 h-8 sm:w-12 sm:h-12 rounded-lg text-xl sm:text-3xl text-center p-0",
        className,
      )}
      maxLength={1}
      {...props}
    />
  )
}
