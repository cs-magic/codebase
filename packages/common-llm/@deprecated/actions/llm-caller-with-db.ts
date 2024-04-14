import { IBaseResponse } from "@cs-magic/p01-card/src/schema/query";
import { LLMActionPayload } from "@cs-magic/p01-card/src/schema/sse";
import { callLLM_V1 } from "./llm-caller";

export const callLLMWithDB = async <T extends IBaseResponse>(
  payload: LLMActionPayload,
  onResponse: (response: T) => Promise<void>,
) => {
  const response = {
    tStart: new Date(),
    content: "",
  } as T;
  await callLLM_V1(payload, {
    onData: (data) => {
      response.content += data;
    },
    onError: (error) => {
      response.error = error;
    },
    onFinal: async () => {
      response.tEnd = new Date();
      console.log("-- onFinal: ", response);
      await onResponse(response);
    },
  });
};
