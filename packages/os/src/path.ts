import fs from "fs"
import path from "path"

export const projectDir = process.cwd()

export const generatedDir = path.join(projectDir, ".generated")
if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir)
