import { isClient } from "../../../packages-to-classify/env/utils/is-client"

export const upgradeUrl = (url: string) =>
  isClient && location.href.includes("https")
    ? url.replace(/http:/g, "https:")
    : url
