import { ensurePathSync } from "@cs-magic/common/utils/ensure-path-sync"
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
  static generatedDir = ensurePathSync(path.join(Path.projectDir, ".generated"))
  static envFile = path.join(Path.projectDir, "projects/p01-card/.env")
}
