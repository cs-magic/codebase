import { createCallLLMSchema } from "../../packages/common-llm/schema/call-llm"

console.log(createCallLLMSchema.parse({ modelName: "gpt" }))
console.log(createCallLLMSchema.parse({ modelName: "gpt", openAIApiKey: null }))
