"use client"

import { useRef } from "react"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { GenCardControls } from "./gen-card-controls"
import { GenCardView } from "./gen-card-view"

export const GenCardViaFrontend = () => {
  const refCard = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "justify-start overflow-auto w-full sm:max-w-[1280px] mx-auto gap-4 p-2 sm:p-4",
        "grid grid-cols-1 sm:grid-cols-2",
      )}
    >
      <GenCardControls obj={refCard} />

      <div>
        <GenCardView ref={refCard} />
      </div>
    </div>
  )
}
