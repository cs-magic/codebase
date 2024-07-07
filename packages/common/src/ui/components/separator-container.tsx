import { PropsWithChildren } from "react"

import { Separator } from "./shadcn/ui/separator.jsx"
import React from "react"

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
