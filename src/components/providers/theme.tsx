"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export default function ThemeProvider_(props: ThemeProviderProps) {
  return <NextThemeProvider {...props} />
}
