"use client"
import { useDisplayAutoHeight } from "@cs-magic/common"
import { useEnhancedRouter } from "@cs-magic/common"
import { PropsWithChildren } from "react"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
