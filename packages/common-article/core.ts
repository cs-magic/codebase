"use server"

import OpenAI from "openai"
import { api } from "../common-api"
import { IArticleSummary } from "./schema"

export const fetchArticleSummary = async (
  content: string,
): Promise<IArticleSummary | null> => {
  console.log("-- summary fetching")
  const { data } = await api.postForm<OpenAI.ChatCompletion>(
    "https://openapi.cs-magic.cn/agent/call",
    {
      content,
    },
    {
      params: {
        agent_type: "article-summariser",
        model_type: "gpt-4",
      },
    },
  )
  const response = data.choices[0]?.message.content ?? undefined
  console.log("-- summary fetched")
  return { response }
}
