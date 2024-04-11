import { promises } from "fs"
import path from "path"
import { dumpJSON } from "../packages/common-common/dump-json"
import { projectPath } from "../packages/common-common/path"
import { callAgent } from "../packages/common-llm/call-agent"

const fn = process.argv[2]!

;(async () => {
  const input = await promises.readFile(path.join(projectPath, `.data/${fn}`), {
    encoding: "utf-8",
  })

  const res = await callAgent({
    input,
    agentType: "summarize-ancient-title",
  })

  await dumpJSON(res, `${path.basename(fn)}-${Date.now()}.json`)
})()
