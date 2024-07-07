"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import React from "react"

export default function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemeProvider {...props} />
}
