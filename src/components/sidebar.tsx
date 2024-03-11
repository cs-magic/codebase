"use client"
import { HTMLAttributes } from "react"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useLLMForConvTitle } from "../hooks/use-llm-for-conv-title"
import { SidebarClearConvs } from "./sidebar-clear-convs"
import { SidebarConvs } from "./sidebar-convs"
import { SidebarCreateConv } from "./sidebar-conv-add"

export const Sidebar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  useLLMForConvTitle()

  return (
    <div
      className={cn("shrink-0 p-4 h-full sm:flex flex-col", className)}
      {...props}
    >
      <SidebarCreateConv />

      <SidebarClearConvs />

      <div className={"grow overflow-auto"}>
        <SidebarConvs />
      </div>
    </div>
  )
}
