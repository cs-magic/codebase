"use client"
import { useDisplayAutoHeight } from "@cs-magic/hooks"

import { useEnhancedRouter } from "@cs-magic/hooks"
import { PropsWithChildren } from "react"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
