import { ensureDirSync } from "@cs-magic/common/utils/ensure-dir-sync"
import path from "path"
import { fileURLToPath } from "url"

export class Path {
  // static currentFile = __filename
  static currentFile = fileURLToPath(import.meta.url) // 不能命名为 __filename，会导致重复定义

  static packageDir = path.dirname(
    path.dirname(path.dirname(path.dirname(Path.currentFile))),
  )

  static projectDir = path.dirname(Path.packageDir)

  static envFile = path.join(Path.projectDir, ".env")
  static envLocalFile = path.join(Path.projectDir, ".env.local")
  static generatedDir = ensureDirSync(path.join(Path.projectDir, ".generated"))
  static dataDir = ensureDirSync(path.join(Path.projectDir, ".data"))
}
