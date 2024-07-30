import { prisma } from "@cs-magic/common/dist/server.js"
import { types } from "wechaty"
import type { PuppetVersion } from "wechaty-puppet"

/**
 * todo: limited input
 * @param title
 * @param version
 */
export const getQuotedMessage = async (
  id?: string,
  title?: string,
  version: PuppetVersion = "mark@2024-04-19",
) => {
  const row = await prisma.wechatMessage.findFirstOrThrow({
    where: {
      type: types.Message.Url,
      OR: [
        {
          text: {
            contains: title,
          },
        },
        {
          id,
        },
      ],
    },
    orderBy: { createdAt: "desc" },
  })
  return row
}
