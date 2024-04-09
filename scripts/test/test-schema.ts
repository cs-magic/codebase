import { createCallLLMSchema } from "../../packages/common-llm/schema/llm"

console.log(createCallLLMSchema.parse({ modelName: "gpt" }))
console.log(createCallLLMSchema.parse({ modelName: "gpt", openAIApiKey: null }))
