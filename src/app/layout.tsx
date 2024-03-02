import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "@/lib/trpc/react"
import ThemeProvider from "@/providers/theme"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "@/providers/session"
import {
  ContentAlertDialog,
  LoadingAlertDialog,
} from "@/components/common/dialogs"
import { type Viewport } from "next"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import SocketProvider from "@/providers/socket"
import { AppStatus } from "@/components/branding"
import { SelectPAppsDialog } from "@/components/select-p-apps-dialog"
import LLMProvider from "@/providers/llm-provider"
import { ScreenProvider } from "@/providers/screen-provider"
import { AutoHeight } from "@/components/auto-height"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Sokka",
  description: "Sokka | Soga | WayToAGI | CS-Magic | CSMagic",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

// ref: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#use-viewport-export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={cn(`font-sans`, inter.variable)}>
        {/*data layer*/}
        <SocketProvider>
          <SessionProvider>
            <TRPCReactProvider>
              <LLMProvider>
                {/*ui layer */}
                <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
                  <TooltipProvider>
                    <ScreenProvider>
                      <main className={"w-full h-full flex flex-col relative"}>
                        {children}

                        <Toaster
                          richColors
                          position={"top-right"}
                          duration={3000}
                        />

                        <LoadingAlertDialog />
                        <ContentAlertDialog />

                        <SelectPAppsDialog />

                        <AutoHeight />

                        <AppStatus />
                      </main>
                    </ScreenProvider>
                  </TooltipProvider>
                </ThemeProvider>
              </LLMProvider>
            </TRPCReactProvider>
          </SessionProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
