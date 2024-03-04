import { PropsWithChildren } from "react"
import Link from "next/link"

export const AuthContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        "w-full h-full flex items-center justify-center gap-4 bg-muted p-4"
      }
    >
      <div
        className={
          "rounded-lg w-full sm:w-[480px] p-8 bg-background flex flex-col items-center gap-8"
        }
      >
        <div className={"rounded-lg w-full"}>{children}</div>

        <div className={"text-xs text-muted-foreground mt-8"}>
          由
          <Link
            className={"font-semibold mx-1"}
            href={"https://cs-magic.cn"}
            target={"_blank"}
          >
            魔法社
          </Link>
          提供安全支持
        </div>
      </div>
    </div>
  )
}
