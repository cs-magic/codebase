import { WechatyBuilder } from "wechaty"
import { type IBotContext } from "./schema"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    context?: IBotContext
  }
}
