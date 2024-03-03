import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "../../packages/common/lib/trpc/react"
import ThemeProvider from "../../packages/common/components/theme.provider"
import { Toaster } from "../../packages/common/components/ui/sonner"
import { SessionProvider } from "../../packages/common/components/session.provider"
import { type Viewport } from "next"
import { cn } from "../../packages/common/lib/utils"
import { TooltipProvider } from "../../packages/common/components/ui/tooltip"
import { AppStatus } from "@/components/branding"
import { AppsSelector } from "@/components/apps-selector"
import LLMProvider from "@/components/apps.provider"
import { ScreenProvider } from "../../packages/common/components/screen.provider"
import { AutoHeight } from "@/components/toolkits/auto-height"
import { Devtool } from "@/components/toolkits/devtool"
import { env } from "@/env"
import { LoadingAlertDialog } from "../../packages/common/components/loading-alert-dialog"
import { ContentAlertDialog } from "../../packages/common/components/content-alert-dialog"
import JotaiProvider from "../../packages/common/components/jotai.provider"

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
        <JotaiProvider>
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

                        <AppsSelector />

                        <AutoHeight />

                        <AppStatus />

                        {env.NODE_ENV === "development" && <Devtool />}
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
