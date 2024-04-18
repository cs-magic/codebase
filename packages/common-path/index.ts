import { ensureDirSync } from "packages/common-common/utils/ensure-dir-sync"
import path from "path"
import { fileURLToPath } from "url"

export class Path {
  // fix the package
  private static currentFile = fileURLToPath(import.meta.url)
  private static packageDir = path.dirname(Path.currentFile)

  // for other projects
  static packagesDir = path.dirname(Path.packageDir)
  static projectDir = path.dirname(Path.packagesDir)

  // for specific projects
  static generatedDir = ensureDirSync(path.join(Path.projectDir, ".generated"))
  static envFile = path.join(Path.projectDir, ".env")
  static envLocalFile = path.join(Path.projectDir, ".env.local")
}
