import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "../../packages/common/lib/trpc/react"
import ThemeProvider from "../../packages/common/components/theme.provider"
import { Toaster } from "../../packages/common/components/ui/sonner"
import { SessionProvider } from "../../packages/common/components/session.provider"
import { type Viewport } from "next"
import { cn } from "../../packages/common/lib/utils"
import { TooltipProvider } from "../../packages/common/components/ui/tooltip"
import { AppsDialog } from "../components/select-apps"
import { ScreenProvider } from "../../packages/common/components/screen.provider"
import { AutoHeight } from "@/components/_auto-height"
import { Devtool } from "@/components/_devtool"
import { env } from "@/env"
import { LoadingAlertDialog } from "../../packages/common/components/loading-alert-dialog"
import JotaiProvider from "../../packages/common/components/jotai.provider"
import { ReturnHomeAlertDialog } from "@/components/_return-home"
import { CheckAuthAlertDialog } from "@/components/auth-checker"
import { SystemSocketStatus } from "@/components/system-socket-status"
import LLMProvider from "../providers/apps.provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Eval AI | 优秀的 AI 评测平台",
  description: "Eval | AI评测 | CSMagic | WayToAGI",
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
    // html should be at the top, for providing context
    <html lang="zh" suppressHydrationWarning>
      <body className={cn(`font-sans`, inter.variable)}>
        {/* 1. data layer */}
        <JotaiProvider>
          <SessionProvider>
            <TRPCReactProvider>
              <LLMProvider>
                {/* 2. ui layer */}
                <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
                  <TooltipProvider>
                    <ScreenProvider>
                      <main
                        className={cn(
                          "w-screen relative overflow-hidden",
                          //"bg-cyan-900"
                        )}
                      >
                        {children}

                        <Toaster
                          richColors
                          position={"top-right"}
                          duration={3000}
                          closeButton={false}
                        />

                        <LoadingAlertDialog />

                        <CheckAuthAlertDialog />

                        <ReturnHomeAlertDialog />

                        <AppsDialog />

                        <AutoHeight />

                        {env.NODE_ENV !== "production" && (
                          <>
                            <SystemSocketStatus />

                            <Devtool />
                          </>
                        )}
                      </main>
                    </ScreenProvider>
                  </TooltipProvider>
                </ThemeProvider>
              </LLMProvider>
            </TRPCReactProvider>
          </SessionProvider>
        </JotaiProvider>
      </body>
    </html>
  )
}
