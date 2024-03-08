import { useAtom } from "jotai"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { IBaseResponse } from "../schema/query"
import { ILLMRequest } from "../schema/sse"
import { checkRespondingStatus, requestIdAtom } from "../store/conv"
import { useQueryLlmPusher } from "./use-query-llm-pusher"
import { useQueryLlmSse } from "./use-query-llm-sse"

export const useQueryLLM = (
  appId: string,
  response: IBaseResponse | undefined,
) => {
  const [requestId] = useAtom(requestIdAtom)
  const [pusherServerId] = useAtom(pusherServerIdAtom)

  const llmRequest: ILLMRequest = {
    type: "app-response",
    status: checkRespondingStatus(response),
    requestId,
    appId,
    pusherServerId,
  }

  useQueryLlmPusher(llmRequest)

  useQueryLlmSse(llmRequest)
}
