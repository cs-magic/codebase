"use client"
import { PropsWithChildren } from "react"
import { useDisplayAutoHeight } from "@cs-magic/common/deps/hooks/use-display-auto-height"
import { useEnhancedRouter } from "@cs-magic/common/deps/hooks/use-enhanced-router"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
