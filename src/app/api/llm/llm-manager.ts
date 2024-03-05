import { IRequest } from "../../../../packages/common/lib/sse/schema"
import { staticCreate } from "../../../../packages/common/lib/utils"

export const llmManager = staticCreate<Record<string, IRequest>>(() => ({}))
console.log({ llmManager })
