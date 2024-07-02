/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export declare const createTRPCContext: (opts: {
    headers: Headers;
}) => Promise<{
    headers: Headers;
    session: import("next-auth").Session | null;
}>;
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
