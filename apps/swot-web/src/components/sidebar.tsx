"use client"
import { HTMLAttributes } from "react"
import { cn } from "@cs-magic/common/ui-shadcn/utils"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("h-full shrink-0 flex-col p-4 sm:flex", className)}
      {...props}
    >
      <div className={"grow overflow-auto"}></div>
    </div>
  )
}
