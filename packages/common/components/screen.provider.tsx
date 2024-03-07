"use client"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { useMeasure, useWindowSize } from "react-use"
import { toast } from "sonner"

import { uiScreenAtom } from "../store/ui"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [, setMainArea] = useAtom(uiScreenAtom)

  useEffect(() => {
    setMainArea({ width, height })
    // console.log({ width, height })
  }, [width, height])

  return (
    <div id={"screen-measure"} ref={ref}>
      {children}
    </div>
  )
}
