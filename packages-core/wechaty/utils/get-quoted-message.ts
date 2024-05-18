import { types } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import { PuppetVersion } from "../../wechaty-puppet/src/extra/version"

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
