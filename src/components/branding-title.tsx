import { HTMLAttributes } from "react"
import Link from "next/link"
import { cn } from "../../packages/common-ui/shadcn/utils"

export const BrandingTitle = ({
  withDescription,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { withDescription?: boolean }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "hidden sm:flex justify-center",
        // "w-full" ,
        // "w-[240px]",
        "shrink-0",
        // " bg-cyan-800",
      )}
    >
      <h1
        className={cn(
          "text-6xl gap-4 font-bold primary-gradient flex",
          className,
        )}
        {...props}
      >
        Eval AI
        {/*搜 嘎*/}
        {/*<span*/}
        {/*  className={*/}
        {/*    "rotate-12 scale-150 inline-block primary-gradient bg-gradient-to-t"*/}
        {/*  }*/}
        {/*>*/}
        {/*  {" !"}*/}
        {/*</span>*/}
      </h1>

      {/*{withDescription && <span className={"text-sm"}>全栈 AI 平台</span>}*/}
    </Link>
  )
}
