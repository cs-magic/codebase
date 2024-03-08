import { createTRPCRouter } from "../../../../packages/common-trpc/trpc"
import { coreRouter } from "./core"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  core: coreRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
