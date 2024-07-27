import { isClient } from "./is-client.js"

/**
 * ref: https://stackoverflow.com/a/30026162
 */
export const isWechatBrowser =
  isClient && /micromessenger/i.test(navigator.userAgent)
