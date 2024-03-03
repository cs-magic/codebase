"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"

import { type AppRouter } from "@/lib/trpc/root"
import { getUrl, transformer } from "./shared"
import { REFETCH_TRPC_ON_WINDOW_FOCUS_ENABLED } from "@/config/system"

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: REFETCH_TRPC_ON_WINDOW_FOCUS_ENABLED,
        retry: false, // 不要 retry，否则会导致客户端等待
      },
    },
  })

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new schema client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same schema client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export const api = createTRPCReact<AppRouter>({})

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,

      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),

        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}
