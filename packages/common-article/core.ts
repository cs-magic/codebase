"use server"

import OpenAI from "openai"
import { api } from "../common-api"

export const fetchArticleSummary = async (
  content: string,
): Promise<string | null | undefined> => {
  console.log("-- summary fetching")
  const { data } = await api.postForm<OpenAI.ChatCompletion>(
    "https://openapi.cs-magic.cn/agent/call",
    {
      agent_type: "summariser",
      model_type: "gpt-4",
      content,
    },
  )
  return data.choices[0]?.message.content
}
