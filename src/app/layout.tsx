import { ReturnHomeAlertDialog } from "@/components/_return-home"
import { CheckAuthAlertDialog } from "@/components/auth-checker"
import "@/styles/globals.css"
import { type Viewport } from "next"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "../../packages/common-trpc/react"
import { LoadingAlertDialog } from "../../packages/common-ui/components/loading"
import JotaiProvider from "../../packages/common-ui/providers/jotai.provider"
import { ScreenProvider } from "../../packages/common-ui/providers/screen.provider"
import { SessionProvider } from "../../packages/common-ui/providers/session.provider"
import ThemeProvider from "../../packages/common-ui/providers/theme.provider"
import { Toaster } from "../../packages/common-ui/shadcn/shadcn-components/sonner"
import { TooltipProvider } from "../../packages/common-ui/shadcn/shadcn-components/tooltip"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { Dev } from "../components/dev"
import { AppsDialog } from "../components/dialog-select-apps"
import GlobalHooksProviders from "../providers/global.provider"
import ansiColors from "ansi-colors"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Eval AI | 专业 AI 评测平台",
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
  console.log(ansiColors.red("== RootLayout =="))

  return (
    // html should be at the top, for providing context
    <html lang="zh" suppressHydrationWarning>
      <body className={cn(`font-sans`, inter.variable)}>
        {/* 1. data layer */}
        <JotaiProvider>
          <SessionProvider>
            <TRPCReactProvider>
              {/* 2. ui layer */}
              <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
                <TooltipProvider>
                  <ScreenProvider>
                    {/* 3. hooks layer */}
                    <GlobalHooksProviders>
                      <main
                        className={cn(
                          "w-screen overflow-hidden relative",
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

                        {/* 开发专用 */}
                        <Dev />
                      </main>
                    </GlobalHooksProviders>
                  </ScreenProvider>
                </TooltipProvider>
              </ThemeProvider>
            </TRPCReactProvider>
          </SessionProvider>
        </JotaiProvider>
      </body>
    </html>
  )
}
