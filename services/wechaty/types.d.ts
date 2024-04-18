import { type WechatyBuilder } from "wechaty"
import { SenderQueue } from "./handle-messages/sender-queue"
import { type IBotStaticContext } from "./schema/bot"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    staticContext: IBotStaticContext
    wxid: string
    sendQueue: SenderQueue
  }
}
