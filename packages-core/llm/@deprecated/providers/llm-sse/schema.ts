import { ResponseFinalStatus } from "@cs-magic/common/schema/sse"
import {
  ITransClient,
  ITransEvent,
  ITransChannel,
} from "../../../../../packages-to-classify/sse/schema"

export interface ILLMManagerTraditional {
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
  onClientConnected: (client: ITransClient) => Promise<void>
  // 2. a user leaved
  onClientDisconnected: (clientId: string) => Promise<void>

  //////////////////////////////
  // general
  //////////////////////////////

  trigger?: ITransChannel | null
  // todo: redis type hint
  // getTrigger?: Promise<ISSETrigger | null>
}
