import { promises } from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { fetchBilibiliDetail } from "../packages/common-bilibili/actions"

void fetchBilibiliDetail("BV1yW4y1L7wA").then(async (data) => {
  await promises.writeFile(
    path.join(fileURLToPath(import.meta.url), "../bilibili-data.json"),
    JSON.stringify(data, null, 2),
  )
})
