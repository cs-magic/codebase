import { staticCreate } from "@/common/lib/utils"

import { IRequest } from "@/app/api/llm/schema"

export const manager = staticCreate<Record<string, IRequest>>(() => ({}))
