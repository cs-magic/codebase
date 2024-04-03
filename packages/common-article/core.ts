"use server"

import { api } from "../common-api"

export type IAgentResponse = {
  content: string
  model: string
}

export const fetchArticleSummary = async (content: string) => {
  const { data } = await api.postForm<IAgentResponse>(
    "https://openapi.cs-magic.cn/agent/call",
    {
      agent_type: "summariser",
      model_type: "gpt-4",
      content,
    },
  )
  return data
}
