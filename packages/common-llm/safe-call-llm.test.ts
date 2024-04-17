import { safeCallLLM } from "./safe-call-llm"

const f = async () => {
  await safeCallLLM({
    // model: "gpt-3.5-turbo",
    model: "moonshot-v1-8k",
    messages: [
      {
        role: "user",
        content: "hello",
      },
    ],
  })
}

// it("should ", f, 20e3)

void f()
