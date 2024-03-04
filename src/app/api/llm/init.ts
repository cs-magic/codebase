import { staticCreate } from "../../../../packages/common/lib/utils"

import { IRequest } from "../../../../packages/common/lib/sse/schema"

export const manager = staticCreate<Record<string, IRequest>>(() => ({}))
