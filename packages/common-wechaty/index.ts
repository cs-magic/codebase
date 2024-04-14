import { createWechatyBot } from "./create-wechaty-bot"

void createWechatyBot({ name: process.argv[2] ?? "default" }).start()
