import { ISSERequest } from "../../../../packages/common/lib/sse/schema"
import { staticCreate } from "../../../../packages/common/lib/utils"

export const llmManager = staticCreate<Record<string, ISSERequest>>(() => ({}))
console.log({ llmManager })
