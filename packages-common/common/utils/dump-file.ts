import fs, { promises } from "fs"
import path from "path"
import { Path } from "../../../packages-to-classify/path"
import { formatAction } from "./format-action"

export const dumpFile = async (
  content: string | object,
  fn: string,
  dir: string = Path.generatedDir,
  // type: "json" | "text" = "json",
) => {
  if (!fs.existsSync(dir)) fs.mkdir(dir, () => null)

  const fp = path.join(dir, fn)

  await formatAction(async () => {
    await promises.writeFile(
      fp,
      typeof content === "string" ? content : JSON.stringify(content, null, 2),
    )
  }, `dumping JSON file into file://${fp}`)
}
