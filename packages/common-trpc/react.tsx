"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useCallback, useMemo, useState } from "react"

import { AppRouter, getUrl, transformer } from "./shared"

import { REFETCH_TRPC_ON_WINDOW_FOCUS_ENABLED } from "./config"
import { useAtom } from "jotai"
import { trpcReactLogEnabledAtom } from "./store"

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
  const [trpcReactLogEnabled] = useAtom(trpcReactLogEnabledAtom)

  const create = () => {
    // console.log({ trpcReactLogEnabled })

    return api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            // in client, we cannot directly use env.xxx
            trpcReactLogEnabled &&
            (process.env.NODE_ENV !== "production" ||
              (op.direction === "down" && op.result instanceof Error)),
        }),

        // 这个必须放log下面才有用
        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),
      ],
    })
  }

  const trpcClient = useMemo(create, [trpcReactLogEnabled])
  // const trpcClient = useCallback(create, [trpcReactLogEnabled])()
  // const [trpcClient] = useState(create()) // 这个直接固定初始了，不能用

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}
