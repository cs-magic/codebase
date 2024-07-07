"use client"

/**
 * ref: https://jotai.org/
 */

import { Provider } from "jotai"
import React from "react"
import { PropsWithChildren } from "react"

export default function JotaiProvider({ children }: PropsWithChildren) {
  // useAtomsDevtools("Jotai!")

  return (
    <Provider>
      {/*<DevTools />*/}

      {children}
    </Provider>
  )
}
