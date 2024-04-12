import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

export const loadBotTemplate = () => {
  return fs.readFileSync(
    path.join(fileURLToPath(import.meta.url), "../../config/template.yml"),
    { encoding: "utf8" },
  )
}
