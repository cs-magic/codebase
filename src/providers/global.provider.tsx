"use client"
import { PropsWithChildren } from "react"
import { useDisplayAutoHeight } from "../../packages/common-hooks/use-display-auto-height"
import { useEnhancedRouter } from "../../packages/common-hooks/use-enhanced-router"
import { useInitServerApps } from "../hooks/use-apps-init"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  useInitServerApps()

  return <>{children}</>
}
