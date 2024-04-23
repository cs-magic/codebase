import { ILlmMessage } from "@cs-magic/p01-common/schema/message"
import OpenAI, { ClientOptions } from "openai"
import ZhipuAi from "zhipuai-sdk-nodejs-v4"
import { api } from "../api-client/api"
import { backendApi } from "../api-client/backend-api"
import { LlmModelType } from "./schema/llm.models"
import { LlmProviderType } from "./schema/llm.providers"
import ChatCompletionCreateParamsNonStreaming = OpenAI.ChatCompletionCreateParamsNonStreaming

export type ICompletion = OpenAI.Chat.Completions.ChatCompletion

export const callLlm = async ({
  apiKey,
  llmProviderType,
  clientConfig,
  queryConfig,
}: {
  apiKey: string
  llmProviderType: LlmProviderType
  clientConfig: ClientOptions
  queryConfig: {
    model: LlmModelType
    messages: ILlmMessage[]
  }
}): Promise<ICompletion> => {
  switch (llmProviderType) {
    case "zhipu":
      return (await new ZhipuAi(clientConfig).createCompletions(
        queryConfig,
      )) as unknown as ICompletion // todo: without unknown

    case "baichuan":
      return (
        await api.post<ICompletion>(
          "https://api.baichuan-ai.com/v1/chat/completions",
          queryConfig,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
      ).data

    case "dashscope":
      return (
        await backendApi.post<ICompletion>("/llm/base", queryConfig, {
          headers: {
            ContentType: "application/json",
          },
        })
      ).data

    case "moonshot":
    case "openai":
    default:
      return (
        new OpenAI({
          ...clientConfig,
        }).chat.completions
          // todo: type hint
          .create(queryConfig as ChatCompletionCreateParamsNonStreaming)
      )
  }
}
