"use server"

import { env } from "@/env"
import { api } from "../common-api"

export type IAgentResponse = {
  content: string
  model: string
}

export const fetchArticleSummary = async (content: string) => {
  const url = `${env.NEXT_PUBLIC_BACKEND_URL}/agent/call`
  const body = {
    agent_type: "summariser",
    model_type: "gpt-4",
    content,
  }
  console.log("-- fetching summary: ", { url, body })

  const { data } = await api.postForm<IAgentResponse>(url, body)
  return data
}
