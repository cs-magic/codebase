"use client"
import { cn } from "@cs-magic/common"
import { HTMLAttributes } from "react"

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
