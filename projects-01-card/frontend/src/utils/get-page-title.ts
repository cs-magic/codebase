import { config } from "@/config"

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
