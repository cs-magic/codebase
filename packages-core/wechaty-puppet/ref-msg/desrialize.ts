import { AppMessageType } from "wechaty-puppet-padlocal"
import { z } from "zod"

export type DeserializedRefMsgPayload =
  | {
      id: string
      content: string
      type: AppMessageType
    }
  | string

export const deserializeRefMsgPayload = (
  v: string,
): DeserializedRefMsgPayload => {
  const m = /^RefMsg\(id=(.*?), type=(.*?), content=(.*?)\)$/ms.exec(v)
  // logger.debug(`deserialized ref message payload: %o`, m);
  if (!m) return v
  return {
    id: z.string().parse(m[1]),
    content: z.string().parse(m[3]),
    // todo: better hint
    // @ts-ignore
    type: z.nativeEnum(AppMessageType).parse(AppMessageType[m[2]!]),
  }
}
