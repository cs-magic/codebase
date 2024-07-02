import { config } from "@cs-magic/common"

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
