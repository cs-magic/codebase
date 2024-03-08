import {
  IClient,
  ISseEvent,
  ISseTrigger,
} from "../../../../packages/common-sse/schema"

export interface ILlmManagerPusher {
  //////////////////////////////
  // server (POST)
  //////////////////////////////

  // 1. add trigger, on LLM starts
  onTriggerStarts: (trigger: ISseTrigger) => Promise<void>
  // 2. clean trigger, on LLM ends
  onTriggerEnds: () => Promise<void>
  // 3. push event to clients, when LLM outputs token
  onEvent: (event: ISseEvent) => Promise<void>

  ///////////////////////////////
  // client (GET)
  //////////////////////////////

  // 1. a user visited
  onClientConnected: (clientId: string) => void
  // 2. a user leaved
  onClientDisconnected: (clientId: string) => void
}

export interface ILlmManagerTraditional {
  //////////////////////////////
  // server (POST)
  //////////////////////////////

  // 1. add trigger, on LLM starts
  onTriggerStarts: (trigger: ISseTrigger) => Promise<void>
  // 2. clean trigger, on LLM ends
  onTriggerEnds: () => Promise<void>
  // 3. push event to clients, when LLM outputs token
  onEvent: (event: ISseEvent) => Promise<void>

  ///////////////////////////////
  // client (GET)
  //////////////////////////////

  // 1. a user visited
  onClientConnected: (client: IClient) => Promise<void>
  // 2. a user leaved
  onClientDisconnected: (clientId: string) => Promise<void>

  //////////////////////////////
  // general
  //////////////////////////////

  trigger?: ISseTrigger | null
  // todo: redis type hint
  // getTrigger?: Promise<ISseTrigger | null>
}
