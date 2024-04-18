import * as fs from "fs"

export const ensurePathSync = (s: string) => {
  if (!fs.existsSync(s)) fs.mkdirSync(s)
  return s
}
