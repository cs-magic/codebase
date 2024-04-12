import { WechatyBuilder } from "wechaty"
import { type IBotContext, IBotTemplate } from "./schema"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    context: IBotContext

    prettyQuery: (title: string, content: string, tips?: string) => string

    template: () => IBotTemplate
  }
}
