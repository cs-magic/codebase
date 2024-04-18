import { types } from "wechaty"
import { prisma } from "../../../packages/common-db/providers/prisma"

export const getQuotedMessage = async (title: string) => {
  const row = await prisma.wechatMessage.findFirstOrThrow({
    where: {
      type: types.Message.Url,
      text: {
        contains: title,
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return row
}
