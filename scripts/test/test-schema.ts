import { createCallLLMSchema } from "../../packages/llm/schema"

console.log(createCallLLMSchema.parse({ modelName: "gpt" }))
console.log(createCallLLMSchema.parse({ modelName: "gpt", openAIApiKey: null }))
