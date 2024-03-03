import { createTRPCRouter } from "@/lib/trpc/trpc"
import { llmRouter } from "@/lib/trpc/routers/llm"
import { queryLLMRouter } from "@/core/query-llm/server/route"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  llm: llmRouter,
  queryLLM: queryLLMRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
