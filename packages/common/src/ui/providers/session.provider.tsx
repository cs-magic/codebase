"use client"

import { SessionProvider as NextSessionProvider } from "next-auth/react"
import React from "react"
import { PropsWithChildren } from "react"

export const SessionProvider = ({ children }: PropsWithChildren) => {
  return <NextSessionProvider>{children}</NextSessionProvider>
}
