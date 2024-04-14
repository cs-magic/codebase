import { debugProcesses } from "../common-dev/debug-processes"
import { createWechatyBot } from "./create-wechaty-bot"

const bot = createWechatyBot({ name: process.argv[2] ?? "default" })
void bot.stop().then(() => {
  debugProcesses()
  // process.exit(0)
})
// .start()
// .stop()
