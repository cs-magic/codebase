"use client"

import { uiInnerHeight, uiViewportHeight } from "@/store/ui"
import { useAtom } from "jotai"
import { useCallback, useEffect, useState } from "react"
import { isNamedDeclarationWithName } from "ts-api-utils"
import { serverLog } from "../lib/actions"

/**
 * ref: https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb
 */
export const useAutoHeight = () => {
  const [vh, setVh] = useAtom(uiViewportHeight)
  const [ih, setIh] = useAtom(uiInnerHeight)

  const getHeight = useCallback(() => {
    const vh = window.visualViewport?.height ?? null
    setVh(vh)

    const ih = window.innerHeight
    setIh(ih)

    return vh ?? ih
  }, [])

  const [height, setHeight] = useState<number>(getHeight())

  useOnScreenKeyboardScrollFix()

  useEffect(() => {
    const handleResize = () => {
      const h = getHeight()
      setHeight(h)

      window.document.documentElement.style.setProperty(
        "--app-height",
        `${h}px`,
      )

      // // void serverLog({ vh, ih, h })
      // const h0 = window.innerHeight
      // const unit = (window.innerHeight - h) / 10
      // let i = 0
      // const f = () => {
      //   const h1 = h0 - ++i * unit
      //   void serverLog({ i, h0, h, unit, h1 })
      //   window.document.documentElement.style.setProperty(
      //     "--app-height",
      //     `${h1}px`,
      //   )
      //   if (h1 > h) setTimeout(f, 100)
      // }
      // f()
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    // From the top of my head this used to be required for older browsers since
    // this didn't trigger a resize event. Keeping it in to be safe.
    window.addEventListener("orientationchange", handleResize)
    // This is needed on iOS to resize the viewport when the Virtual/OnScreen
    // Keyboard opens. This does not trigger any other event, or the standard
    // resize event.
    window.visualViewport?.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      window.visualViewport?.removeEventListener("resize", handleResize)
    }
  }, [getHeight])

  return height
}

/**
 * 不加这条的话 会导致到顶部去
 */
export const useOnScreenKeyboardScrollFix = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}
