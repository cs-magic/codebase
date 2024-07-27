"use client"
import { useDisplayAutoHeight } from "@cs-magic/react-hooks"

import { useEnhancedRouter } from "@cs-magic/react-hooks"
import { PropsWithChildren } from "react"

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}
