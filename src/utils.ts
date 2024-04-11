import { config } from "./config/system"

export const getCardUrl = (id?: string) => `p01/${id}.png`

export const genPageTitle = (title?: string) =>
  [title, config.website.title].filter(Boolean).join(" | ")
