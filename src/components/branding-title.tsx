import Link from "next/link"
import { HTMLAttributes } from "react"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { config } from "../config/system"

export const BrandingTitle = ({
  withDescription,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { withDescription?: boolean }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex justify-center",
        // "w-full" ,
        // "w-[240px]",
        "shrink-0",
        // " bg-cyan-800",
      )}
    >
      <h1
        className={cn(
          "text-lg sm:text-2xl gap-4 font-bold primary-gradient flex",
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
