import { createWechatyBot } from "./create-wechaty-bot.js"

import wechat4u from "wechaty-puppet-wechat4u"
// import padlocal from "wechaty-puppet-padlocal"

console.log({
  wechat4u,
  // padlocal
})

void createWechatyBot().start()
