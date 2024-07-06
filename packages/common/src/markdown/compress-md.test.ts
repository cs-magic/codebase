import { promises } from "fs"
import path from "path"

import { compressMd } from "./compress-md.js"

it("compress", async () => {
  const content = await promises.readFile(path.join(__dirname, "content.md"), {
    encoding: "utf-8",
  })
  expect(content.length).toBeGreaterThan(0)
  const contentCompressed = compressMd(content)
  await promises.writeFile(
    path.join(__dirname, "content-compressed.md"),
    contentCompressed,
  )
})
