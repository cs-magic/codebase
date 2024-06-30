import { config } from "../../../../packages-common/common/config"

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
