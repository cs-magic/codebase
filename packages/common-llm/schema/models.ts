export type LLMProviderType = "openai" | "zhipu" | "moonshot" | "baichuan"

export type LLMModelType =
  | "gpt-3.5-turbo"
  | "gpt-4"
  | "glm-4"
  | "moonshot-v1-8k"
  | "moonshot-v1-32k"
  | "moonshot-v1-128k"
  | "Baichuan2-Turbo"
  | "Baichuan2-Turbo-192k"

export const supportedLLMModelTypes: LLMModelType[] = [
  "gpt-3.5-turbo",
  "gpt-4",
  "glm-4",
  "Baichuan2-Turbo",
  "Baichuan2-Turbo-192k",
  "moonshot-v1-8k",
  "moonshot-v1-32k",
  "moonshot-v1-128k",
]
