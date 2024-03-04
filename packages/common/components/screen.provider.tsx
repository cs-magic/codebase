"use client"
import { PropsWithChildren, useEffect } from "react"
import { useMeasure } from "react-use"
import { useAtom } from "jotai"

import { uiScreenAtom } from "../store/ui"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [, setMainArea] = useAtom(uiScreenAtom)

  useEffect(() => {
    setMainArea({ width, height })
    // console.log({ width, height })
  }, [width, height])

  return (
    <div className={"w-screen h-screen"} ref={ref}>
      {children}
    </div>
  )
}
