import { createAPI } from "../../packages/common/lib/trpc/server"
import { appRouter } from "@/api/routers/__root"

export const api = createAPI(appRouter)
