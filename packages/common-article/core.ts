"use server"

import { env } from "@/env"
import { api } from "../common-api"

export type IAgentResponse = {
  content: string
  model: string
}

export const fetchArticleSummary = async (content: string) => {
  const { data } = await api.postForm<IAgentResponse>(
    `${env.NEXT_PUBLIC_BACKEND_URL}/agent/call`,
    {
      agent_type: "summariser",
      model_type: "gpt-4",
      content,
    },
  )
  return data
}
