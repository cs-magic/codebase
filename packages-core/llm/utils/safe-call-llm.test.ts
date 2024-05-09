import { safeCallLLM } from "./safe-call-llm"

it("should ", async () => {
  const result = await safeCallLLM({
    // model: "gpt-3.5-turbo",
    model: "moonshot-v1-8k",
    messages: [...new Array(33)].map(() => ({
      role: "user",
      content: "hello",
    })),
  })

  console.log(JSON.stringify(result, null, 2))
}, 30e3)
