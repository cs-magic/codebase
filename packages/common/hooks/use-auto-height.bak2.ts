"use client"

import { uiInnerHeight, uiViewportHeight } from "@/store/ui"
import { useAtom } from "jotai"
import { useCallback, useEffect } from "react"

/**
 * ref: https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb
 */
export const useAutoHeight = () => {
  const getIh = useCallback(() => window.innerHeight, [])
  const getVh = useCallback(() => window.visualViewport?.height ?? null, [])

  const [, setVh] = useAtom(uiViewportHeight)
  const [, setIh] = useAtom(uiInnerHeight)

  const handleResize = useCallback(() => {
    const vh = getVh() // !important
    const ih = getIh()
    setVh(vh)
    setIh(ih)

    // if (vh)
    //   document.documentElement.style.setProperty("--app-height", `${ih - vh}px`)
  }, [getVh, getIh])

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    window.visualViewport?.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.visualViewport?.removeEventListener("resize", handleResize)
    }
  }, [handleResize])
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
