import { isClient } from "../../common-env/utils"

export const upgradeUrl = (url: string) =>
  isClient && location.href.includes("https")
    ? url.replace(/http:/g, "https:")
    : url
