"use client"
import { useDisplayAutoHeight } from "@cs-magic/common/hooks/use-display-auto-height"
import { useEnhancedRouter } from "@cs-magic/common/hooks/use-enhanced-router"
import { PropsWithChildren } from "react"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
