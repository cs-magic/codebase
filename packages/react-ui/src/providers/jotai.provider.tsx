"use client"
/**
 * ref: https://jotai.org/
 */

import { Provider } from "jotai/react"
import React, { PropsWithChildren } from "react"

export function JotaiProvider({ children }: PropsWithChildren) {
  // useAtomsDevtools("Jotai!")

  return (
    <>
      <Provider>
        {/*<DevTools />*/}
        he
        {/*{children}*/}
      </Provider>
    </>
  )
}
