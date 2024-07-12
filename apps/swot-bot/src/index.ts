console.log({ wechat4u: await import("wechaty-puppet-wechat4u") })

import { createWechatyBot } from "./create-wechaty-bot.js"

// import padlocal from "wechaty-puppet-padlocal"

void createWechatyBot().then((wechaty) => {
  wechaty.start()
})
