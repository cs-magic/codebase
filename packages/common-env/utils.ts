export const isServer = typeof window === "undefined" //typeof localStorage === "undefined"
export const isClient = !isServer

/**
 * ref: https://stackoverflow.com/a/30026162
 */
export const isWechatBrowser =
  isClient && /micromessenger/i.test(navigator.userAgent)

/**
 * todo: https://nextjs.org/docs/app/api-reference/functions/userAgent
 * ref: https://stackoverflow.com/a/14301832
 */
export const isMobileBrowser = isClient && /Mobi/i.test(navigator.userAgent)
