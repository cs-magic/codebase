import { debugProcesses } from "../common-dev/debug-processes"
import { createWechatyBot } from "./create-wechaty-bot"

const bot = createWechatyBot({ name: process.argv[2] ?? "default" })
void bot
  .start()
  .catch((e) => {
    console.log("-- error: ")
    console.log(e)
  })
  .finally(() => {
    console.log("-- finally")
  })
