import { createBot } from "./core"

void createBot({ name: process.argv[2] ?? "default" })
