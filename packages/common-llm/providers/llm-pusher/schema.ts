import { ISSEEvent, ISSETrigger } from "../../../common-sse/schema"
import { ResponseFinalStatus } from "@/schema/sse"

export interface ILlmManagerPusher {
  //////////////////////////////
  // server (POST)
  //////////////////////////////

  // 1. add trigger, on LLM starts
  onTriggerStarts: (trigger: ISSETrigger) => Promise<void>
  // 2. clean trigger, on LLM ends
  onTriggerEnds: (reason: ResponseFinalStatus) => Promise<void>
  // 3. push event to clients, when LLM outputs token
  onEvent: (event: ISSEEvent) => Promise<void>

  ///////////////////////////////
  // client (GET)
  //////////////////////////////

  // 1. a user visited
  onClientConnected: (clientId: string) => void
  // 2. a user leaved
  onClientDisconnected: (clientId: string) => void
}
