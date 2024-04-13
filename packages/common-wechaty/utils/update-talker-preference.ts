import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { z } from "zod"
import { InputValidatorSchema } from "../../common-common/pretty-invalid-choice"
import { prisma } from "../../common-db/providers/prisma"
import {
  backendEngineTypeSchema,
  langSchema,
} from "../../common-llm/schema/llm"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { getTalkerPreference } from "./get-talker-preference"
import { IParseCommandRes } from "./parse-command"
import { validateInput } from "./validate-input"

const schemaMap: Record<keyof IWechatUserPreference, InputValidatorSchema> = {
  lang: langSchema,
  model: llmModelTypeSchema,
  backend: backendEngineTypeSchema,
  chatEnabled: z.boolean(),
  parserEnabled: z.boolean(),
  chatTopic: z.string(),
}

export const updateTalkerPreference = async <
  T extends keyof IWechatUserPreference,
>(
  message: Message,
  result: IParseCommandRes<string>,
  key: T,
) => {
  if (!result) return

  const schema = schemaMap[key]

  const talkerPreference = await getTalkerPreference(message)
  const data = await validateInput<IWechatUserPreference[T]>(
    schema,
    result.args,
  )

  await prisma.wechatUser.update({
    where: {
      id: message.talker().id,
    },
    data: {
      preference: {
        [key]: data,
      },
    },
  })
  await message.say(`${result.command}：${talkerPreference?.[key]} --> ${data}`)
}
