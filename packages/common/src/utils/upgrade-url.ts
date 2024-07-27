import { isClient } from "../env/index.js"

export const upgradeUrl = (url: string) =>
  isClient && location.href.includes("https")
    ? url.replace(/http:/g, "https:")
    : url
