import { LLMProviderType } from "./schema/call-llm"

export const ensureLLMProviderType = (modelType: string): LLMProviderType => {
  if (modelType.startsWith("gpt")) return "openai"
  if (modelType.startsWith("glm")) return "zhipu"
  if (modelType.startsWith("moonshot")) return "moonshot"
  throw new Error(`invalid LLM model type = ${modelType}`)
}
