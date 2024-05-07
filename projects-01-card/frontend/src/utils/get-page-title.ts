import { config } from "../../../../packages-core/common/config"

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
