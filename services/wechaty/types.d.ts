import { type WechatyBuilder } from "wechaty"
import { type IBotStaticContext } from "./schema/bot"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    staticContext: IBotStaticContext
    wxid: string
  }
}
