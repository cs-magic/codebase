import { IBotContext } from "../schema/bot"

export const formatFooter = (context: IBotContext) =>
  `${context.name} ${context.version}`
