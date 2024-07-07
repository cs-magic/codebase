import { buttonVariants } from "@cs-magic/common/ui/components/shadcn/ui/button"
import { cn } from "@cs-magic/common/ui/utils"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 items-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/branding/enterprise/cs-magic-dark.png"
              alt="CS Magic Logo"
              // className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>

        <Link href={"/connection"} className={cn(buttonVariants())}>
          Connection
        </Link>
      </div>
    </main>
  )
}
