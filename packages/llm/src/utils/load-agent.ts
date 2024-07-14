import { projectDir } from "@cs-magic/os"
import fs from "fs"
import yaml from "js-yaml"
import path from "path"

import { IAgentReq } from "../schema/llm.api.js"
import { AgentType } from "./safe-call-agent.js"

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await fs.promises.readFile(
    path.join(projectDir, `packages/llm/config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
