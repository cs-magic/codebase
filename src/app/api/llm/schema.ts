import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"

export interface ILlmManager {
  //////////////////////////////
  // server (POST)
  //////////////////////////////

  // 1. add trigger, on LLM starts
  onTriggerStarts: (triggerId: string, trigger: ISseTrigger) => Promise<void>
  // 2. clean trigger, on LLM ends
  onTriggerEnds: (triggerId: string) => Promise<void>
  // 3. push event to clients, when LLM outputs token
  onEvent: (triggerId: string, event: ISseEvent) => Promise<void>

  ///////////////////////////////
  // client (GET)
  //////////////////////////////

  // 1. a user visited
  onClientConnected: (triggerId: string, client: IClient) => Promise<void>
  // 2. a user leaved
  onClientDisconnected: (triggerId: string, clientId: string) => Promise<void>

  //////////////////////////////
  // general
  //////////////////////////////

  getTrigger: (triggerId: string) => Promise<ISseTrigger | null>
}
