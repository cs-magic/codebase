import { useEffect, useState } from "react"

export const isClient = () => typeof window !== "undefined"

/**
 * ref: https://stackoverflow.com/a/30026162
 */
export const checkWechatBrowser = () =>
  isClient() && /micromessenger/i.test(navigator.userAgent)

/**
 * todo: https://nextjs.org/docs/app/api-reference/functions/userAgent
 * ref: https://stackoverflow.com/a/14301832
 */
export const checkMobileBrowser = () => /Mobi/i.test(window.navigator.userAgent)

export const useBrowserEnvironment = () => {
  const [isClient, setClient] = useState(false)
  const [isWechat, setWechat] = useState(false)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") setClient(true)
  }, [])

  useEffect(() => {
    setWechat(checkWechatBrowser())
    setMobile(checkMobileBrowser())
  }, [isClient])

  return { isClient, isWechat, isMobile }
}
