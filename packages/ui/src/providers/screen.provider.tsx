"use client"
import { uiScreenAtom } from "@cs-magic/common"
import { useSetAtom } from "jotai"
import React, { PropsWithChildren, useEffect } from "react"
import { useMeasure } from "react-use"

export const ScreenProvider = ({ children }: PropsWithChildren) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const setMainArea = useSetAtom(uiScreenAtom)

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
