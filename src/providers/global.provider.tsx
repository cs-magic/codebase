"use client"
import { PropsWithChildren } from "react"
import { useDisplayAutoHeight } from "../../packages/common-hooks/use-display-auto-height"
import { useEnhancedRouter } from "../../packages/common-hooks/use-enhanced-router"
import { useInitApps } from "../hooks/use-init-apps"
import { useInitCoreValtio } from "../store/core.valtio"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useInitApps()

  useDisplayAutoHeight()

  useEnhancedRouter()

  useInitCoreValtio()

  return <>{children}</>
}
