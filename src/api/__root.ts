import { createTRPCRouter } from "../../packages/common/lib/trpc/trpc"
import { queryLLMRouter } from "@/api/query-llm-router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  queryLLM: queryLLMRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
