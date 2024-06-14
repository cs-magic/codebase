import { ResponseFinalStatus } from "@cs-magic/common/schema/sse"
import { ITransChannel, ITransEvent } from "@cs-magic/common/deps/sse/schema"

export interface ILLMManagerPusher {
  //////////////////////////////
  // server (POST)
  //////////////////////////////

  // 1. add trigger, on LLM starts
  onTriggerStarts: (trigger: ITransChannel) => Promise<void>
  // 2. clean trigger, on LLM ends
  onTriggerEnds: (reason: ResponseFinalStatus) => Promise<void>
  // 3. push event to clients, when LLM outputs token
  onEvent: (event: ITransEvent) => Promise<void>

  ///////////////////////////////
  // client (GET)
  //////////////////////////////

  // 1. a user visited
  onClientConnected: (clientId: string) => void
  // 2. a user leaved
  onClientDisconnected: (clientId: string) => void
}
