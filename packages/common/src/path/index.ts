import { IAgentReq } from "@cs-magic/llm/schema/llm.api"
import { AgentType } from "@cs-magic/llm/utils/safe-call-agent"
import fs, { promises } from "fs"
import yaml from "js-yaml"
import * as process from "node:process"
import path from "path"

export const projectDir = process.cwd()

export const generatedDir = path.join(projectDir, "__generated")
if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir)

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await promises.readFile(
    path.join(projectDir, `packages/llm/config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
