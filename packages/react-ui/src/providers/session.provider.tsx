"use client"

import { SessionProvider as NextSessionProvider } from "next-auth/react"
import React, { PropsWithChildren } from "react"

export const SessionProvider = ({ children }: PropsWithChildren) => {
  return <NextSessionProvider>{children}</NextSessionProvider>
}
