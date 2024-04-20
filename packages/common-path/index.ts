import { ensureDirSync } from "@cs-magic/common/utils/ensure-dir-sync"
import path from "path"

export class Path {
  static currentFile = __filename

  static packageDir = path.dirname(Path.currentFile)

  static packagesDir = path.dirname(Path.packageDir)

  static projectDir = path.dirname(Path.packagesDir)

  static envFile = path.join(Path.projectDir, ".env")
  static envLocalFile = path.join(Path.projectDir, ".env.local")
  static generatedDir = ensureDirSync(path.join(Path.projectDir, ".generated"))
}
