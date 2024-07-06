import { projectDir } from "@cs-magic/common/path/index"
import { promises } from "fs"
import yaml from "js-yaml"
import path from "path"
import { IAgentReq } from "../schema/llm.api"
import { AgentType } from "./safe-call-agent"

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await promises.readFile(
    path.join(projectDir, `packages/llm/config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
