import * as fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

export const commonCommonPathPath = fileURLToPath(import.meta.url)
export const commonCommonPath = path.dirname(commonCommonPathPath)

export const packagesPath = path.dirname(commonCommonPath)

export const projectPath = path.dirname(packagesPath)

export const generatedPath = path.join(projectPath, ".generated")
if (!fs.existsSync(generatedPath)) fs.mkdirSync(generatedPath)

export const envPath = path.join(projectPath, "projects/p01-card/.env")
