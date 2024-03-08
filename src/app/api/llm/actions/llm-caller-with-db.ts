import { LlmActionPayload } from "../../../../schema/sse"
import { callLLM } from "./llm-caller"

export const callLLMWithDB = async <
  T extends {
    tStart: Date | null
    content: string | null
    error: string | null
    tEnd: Date | null
  },
>(
  payload: LlmActionPayload,
  onResponse: (response: T) => Promise<void>,
) => {
  const response = {
    tStart: new Date(),
    content: "",
  } as T
  await callLLM(payload, {
    onData: (data) => {
      response.content += data
    },
    onError: (error) => {
      response.error = error
    },
    onFinal: async () => {
      response.tEnd = new Date()
      console.log("-- onFinal: ", response)
      await onResponse(response)
    },
  })
}
