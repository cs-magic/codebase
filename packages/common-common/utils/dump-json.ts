import fs, { promises } from "fs"
import path from "path"
import { Path } from "../../common-path"
import { formatAction } from "./format-action"

export const dumpJson = async (
  content: any,
  fn: string = `${Date.now()}.json`,
  dir: string = Path.generatedDir,
) => {
  if (!fs.existsSync(dir)) fs.mkdir(dir, () => null)

  const fp = path.join(dir, fn)

  await formatAction(async () => {
    await promises.writeFile(
      fp,
      content instanceof String ? content : JSON.stringify(content, null, 2),
    )
  }, `dumping JSON file into file://${fp}`)
}
