import * as fs from "fs"
import { promises } from "fs"
import path from "path"
import { generatedPath } from "./path"
import { prettyAction } from "./pretty-action"

export const dumpJSON = async (
  content: any,
  fn: string = `${Date.now()}.json`,
  dir: string = generatedPath,
) => {
  if (!fs.existsSync(dir)) fs.mkdir(dir, () => null)

  const fp = path.join(dir, fn)

  await prettyAction(async () => {
    await promises.writeFile(
      fp,
      content instanceof String ? content : JSON.stringify(content, null, 2),
    )
  }, `dumping JSON file into file://${fp}`)
}
