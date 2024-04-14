import { z } from "zod"

export const chatCommands = z.enum([
  "enable-chat",
  "disable-chat",
  "list-topics",
  "check-topic",
  "new-topic",
])

// const result = chatCommands.safeParse("ss")
// if (!result.success) {
//   const message = JSON.parse(result.error.message) as { message: string }[]
//   console.log(message[0]?.message)
// }
