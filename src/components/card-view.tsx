"use client"

import { forwardRef, HTMLAttributes } from "react"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { CardHeader } from "./card-view-header"
import { CardViewContent } from "./card-view-content"
import { CardFooter } from "./card-view-footer"

export const CardView = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "font-card corner-gradient w-full max-w-[375px]",
        className,
      )}
      {...props}
    >
      <CardHeader />

      <div className={"w-full grow gap-2 p-2 min-h-72"}>
        <CardViewContent />
      </div>

      <CardFooter />
    </div>
  )
})
CardView.displayName = "CardView"
