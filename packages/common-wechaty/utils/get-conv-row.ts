import { Message } from "wechaty"
import { getConvTable } from "./get-conv-table"

export const getConvRow = async (message: Message) => {
  const table = getConvTable(message)

  const convId = message.conversation().id

  const conv = await table.findUniqueOrThrow({
    where: { id: convId },
  })

  return conv
}
