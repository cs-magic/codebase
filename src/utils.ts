import { $Enums } from "@prisma/client"

export const getCardUrl = (options?: {
  type: $Enums.PlatformType
  id: string
}) => (!options ? null : `p01/${options.type}/${options.id}.png`)
