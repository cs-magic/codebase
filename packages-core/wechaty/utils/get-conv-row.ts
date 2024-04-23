import { getConvTable } from "./get-conv-table"

export const getConvRow = async (message: {
  isRoom: boolean
  convId: string
}) => {
  const table = getConvTable(message.isRoom)

  const convId = message.convId

  const row = await table.findUniqueOrThrow({
    where: { id: convId },
  })

  return row
}
