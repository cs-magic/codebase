"use client"

/**
 * ref: https://jotai.org/
 */

import { Provider } from "jotai"
import { PropsWithChildren } from "react"
import { DevTools, useAtomsDevtools } from "jotai-devtools"
import { useMounted } from "../hooks/use-mounted"

export default function JotaiProvider({ children }: PropsWithChildren) {
  // useAtomsDevtools("Jotai!")
  const mounted = useMounted()

  return (
    <Provider>
      {/*<DevTools />*/}

      {children}
    </Provider>
  )
}
