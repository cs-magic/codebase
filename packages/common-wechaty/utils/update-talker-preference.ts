import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { prettyInvalidChoice } from "../../common-common/pretty-invalid-choice"
import { LiteralUnionSchema } from "../../common-common/schema"
import { prisma } from "../../common-db/providers/prisma"
import { getTalkerPreference } from "./get-talker-preference"
import { IParseCommandRes } from "./parse-command"

export const updateTalkerPreference = async (
  message: Message,
  result: IParseCommandRes<string>,
  key: keyof IWechatUserPreference,
  schema: LiteralUnionSchema,
) => {
  if (!result) return

  const talkerPreference = await getTalkerPreference(message)
  const parsed = await schema.safeParseAsync(result.command)
  if (!parsed.success) throw new Error(prettyInvalidChoice(result.args, schema))

  await prisma.wechatUser.update({
    where: {
      id: message.talker().id,
    },
    data: {
      preference: {
        [key]: parsed.data,
      },
    },
  })
  await message.say(
    `${result.command}：${talkerPreference?.[key]} --> ${parsed.data}`,
  )
}
