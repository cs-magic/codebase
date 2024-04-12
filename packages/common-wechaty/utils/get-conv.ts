import { Message } from "wechaty"
import { getConvTable } from "./get-conv-table"

export const getConv = async (message: Message) => {
  const table = getConvTable(message)

  const convId = message.conversation().id

  const conv = await table.findUnique({
    where: { id: convId },
  })

  return conv
}
