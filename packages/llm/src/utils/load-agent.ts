import { projectDir } from "@cs-magic/common"
import { IAgentReq } from "../schema/llm.api"
import { AgentType } from "../utils/safe-call-agent"
import { promises } from "fs"
import path from "path"
import yaml from "js-yaml"

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await promises.readFile(
    path.join(projectDir, `packages/llm/config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
