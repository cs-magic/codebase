import { type Viewport } from "next"
import { Inter } from "next/font/google"

import { TRPCReactProvider } from "../../../../packages-to-classify/trpc/react"
import { Toaster } from "../../../../packages-to-classify/ui-shadcn/components/sonner"
import { TooltipProvider } from "../../../../packages-to-classify/ui-shadcn/components/tooltip"
import { cn } from "../../../../packages-to-classify/ui-shadcn/utils"
import { LoadingAlertDialog } from "../../../../packages-to-classify/ui/components/loading"
import JotaiProvider from "../../../../packages-to-classify/ui/providers/jotai.provider"
import { ScreenProvider } from "../../../../packages-to-classify/ui/providers/screen.provider"
import { SessionProvider } from "../../../../packages-to-classify/ui/providers/session.provider"
import ThemeProvider from "../../../../packages-to-classify/ui/providers/theme.provider"
import { Dev } from "../components/dev"

import { config } from "../../../../packages-common/common/config"
import GlobalHooksProviders from "../providers/global.provider"
import "../styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: config.website.title,
  description: config.website.title,
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
  // console.log(ansiColors.red("== RootLayout =="))

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
                      <main className={cn("relative")}>
                        {children}

                        <Toaster
                          richColors
                          position={"top-right"}
                          duration={3000}
                          closeButton={false}
                        />

                        <LoadingAlertDialog />

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
