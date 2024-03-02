"use client"
import { PropsWithChildren, useEffect } from "react"
import { useMeasure } from "react-use"
import { uiState } from "@/store/ui"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    uiState.mainArea = { width, height }
    // console.log({ width, height })
  }, [width, height])
  return (
    <div className={"w-screen h-screen"} ref={ref}>
      {children}
    </div>
  )
}
