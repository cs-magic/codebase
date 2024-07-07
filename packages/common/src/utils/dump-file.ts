import fs, { promises } from "fs"
import path from "path"

import { generatedDir } from "../path/index.js"
import { formatAction } from "./format-action.js"

export const dumpFile = async (
  content: string | object,
  // type: "json" | "text" = "json",
  options?:
    | {
        fn: string
        dir?: string
      }
    | {
        fp: string
      },
) => {
  let fp: string = path.join(generatedDir, `${Date.now()}.json`)

  if (options) {
    if ("fn" in options) {
      const fn = options.fn
      const dir = options.dir ?? generatedDir
      if (!fs.existsSync(dir)) fs.mkdir(dir, () => null)
      fp = path.join(dir, fn)
    } else if ("fp" in options) {
      fp = options.fp
    }
  }

  await formatAction(async () => {
    await promises.writeFile(
      fp,
      typeof content === "string" ? content : JSON.stringify(content, null, 2),
    )
  }, `dumping JSON file into file://${fp}`)
}
