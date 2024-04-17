import { type Message } from "wechaty"
import { getConvTable } from "./get-conv-table"

export const getConvRow = async (message: Message) => {
  const table = getConvTable(message)

  const convId = message.conversation().id

  const row = await table.findUniqueOrThrow({
    where: { id: convId },
  })

  return row
}
