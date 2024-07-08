import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "./shared"

export const api = createTRPCReact<AppRouter>({})
