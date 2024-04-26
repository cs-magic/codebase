import { type WechatyBuilder } from "wechaty"
import { type IBotContext } from "./schema/bot.context"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    context: IBotContext
  }
}
