import { cn } from "@cs-magic/common/ui/utils"
import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes } from "react"

import { config } from "@cs-magic/common"

export const BrandingTitle = ({
  withDescription,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { withDescription?: boolean }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex justify-center items-center",
        // "w-full" ,
        // "w-[240px]",
        "shrink-0",
        // " bg-cyan-800",
      )}
    >
      <Image
        src={"/branding/enterprise/swot.png"}
        alt={""}
        width={36}
        height={36}
        className={"h-auto"}
      />
      <h1
        className={cn(
          "primary-gradient flex gap-4 text-lg font-bold sm:text-2xl",
          className,
        )}
        {...props}
      >
        {config.website.title}
      </h1>

      {/*{withDescription && <span className={"text-sm"}>全栈 AI 平台</span>}*/}
    </Link>
  )
}
