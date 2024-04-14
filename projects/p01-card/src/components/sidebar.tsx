"use client"
import { HTMLAttributes } from "react"
import { cn } from "../../../common-ui-shadcn/utils"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("shrink-0 p-4 h-full sm:flex flex-col", className)}
      {...props}
    >
      <div className={"grow overflow-auto"}></div>
    </div>
  )
}
