import fs from "fs"

export const ensureDirSync = (s: string) => {
  if (!fs.existsSync(s)) fs.mkdirSync(s)

  return s
}
