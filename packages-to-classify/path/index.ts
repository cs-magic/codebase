import { ensureDirSync } from "@cs-magic/common/utils/ensure-dir-sync"
import path from "path"
import { fileURLToPath } from "url"

export class Path {
  // static currentFile = __filename
  static currentFile = fileURLToPath(import.meta.url) // 不能命名为 __filename，会导致重复定义

  static packageDir = path.dirname(Path.currentFile)

  static packagesDir = path.dirname(Path.packageDir)

  static projectDir = path.dirname(Path.packagesDir)

  static envFile = path.join(Path.projectDir, ".env")
  static envLocalFile = path.join(Path.projectDir, ".env.local")
  static generatedDir = ensureDirSync(path.join(Path.projectDir, ".generated"))
}
