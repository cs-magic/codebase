import { formatString } from "@cs-magic/common/utils/format-string"
import { ILlmMessage } from "@cs-magic/p01-common/schema/message"

export const formatLlmMessage = (m: ILlmMessage, maxLength = 40) =>
  `  [${m.role[0]!.toUpperCase()}]: ${formatString(JSON.stringify(m.content), maxLength)}`
