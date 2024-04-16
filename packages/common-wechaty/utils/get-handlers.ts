import { type Wechaty } from "wechaty"
import { MessageHandlerMap } from "../handle-messages/_all"

export const getHandlers = (bot: Wechaty) => {
  // console.log("-- registering handlers")
  const handlers = Object.keys(MessageHandlerMap).map((handlerName) => {
    // console.log(`-- registering handler(name=${handlerName})`)
    const h = new MessageHandlerMap[
      handlerName as keyof typeof MessageHandlerMap
    ](bot, handlerName)
    return h
  })
  return handlers
}
