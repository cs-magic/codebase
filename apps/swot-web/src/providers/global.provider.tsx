"use client"
import { PropsWithChildren } from "react"
import { useDisplayAutoHeight } from "@cs-magic/common"
import { useEnhancedRouter } from "@cs-magic/common"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
