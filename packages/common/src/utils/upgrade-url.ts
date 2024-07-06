import { isClient } from "../env/is-client.js"

export const upgradeUrl = (url: string) =>
  isClient && location.href.includes("https")
    ? url.replace(/http:/g, "https:")
    : url
