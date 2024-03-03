"use client"

import { useEffect } from "react"

export const useAutoHeight = () => {
  useEffect(() => {
    const setInnerHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`,
      )
    }
    window.addEventListener("resize", setInnerHeight)

    setInnerHeight()
    return () => {
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [])
}
