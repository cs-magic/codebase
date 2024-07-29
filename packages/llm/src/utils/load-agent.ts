"use server"

import fs from "fs"
import yaml from "js-yaml"
import path from "path"

import type { IAgentReq } from "../schema/llm.api.js"
import type { AgentType } from "./safe-call-agent.js"

// import { fileURLToPath } from "url"
// import { dirname } from "path"

export const loadAgent = async (agentType: AgentType) => {
  // ref: https://stackoverflow.com/a/62892482/9422455
  // const __filename = fileURLToPath(import.meta.url)
  // const __dirname = dirname(__filename)

  const yamlConfig = await fs.promises.readFile(
    path.join(__dirname, `../config/${agentType}.agent.yml`),
    { encoding: "utf-8" },
  )
  // how can I use some library to ensure the AgentConfig is consistent with the interface
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
