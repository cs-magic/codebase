import { $Enums } from "@prisma/client"
import { config } from "./config/system"

export const getCardUrl = (options?: {
  type: $Enums.PlatformType
  id: string
}) => (!options ? null : `p01/${options.type}/${options.id}.png`)

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
