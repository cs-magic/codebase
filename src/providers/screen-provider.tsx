"use client"

import { uiState } from "@/store/ui"
import { PropsWithChildren, useEffect } from "react"
import { useMeasure } from "react-use"

export default function ScreenProvider({ children }: PropsWithChildren) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    uiState.mainArea = { width, height }
    console.log({ width, height })
  }, [width, height])

  return (
    <div className={"w-screen h-screen"} ref={ref}>
      {children}
    </div>
  )
}
