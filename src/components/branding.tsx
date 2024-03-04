"use client"

import { cn } from "../../packages/common/lib/utils"
import { Avatar, AvatarImage } from "../../packages/common/components/ui/avatar"
import { HTMLAttributes } from "react"
import { BarChart } from "lucide-react"
import { socketLatencyAtom } from "../../packages/common/lib/puser/socket.atom"
import { StatusIcon } from "@/components/status-icon"
import Link from "next/link"
import { SeparatorContainer } from "../../packages/common/components/separator-container"
import { ImageEqualHeight } from "../../packages/common/components/image-equal-height"
import { useAtom } from "jotai"
import { INDIES_AVATARS, SPONSORS_BANNERS } from "@/config/branding"

export const BrandTitle = ({
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
          "text-6xl gap-4 font-bold primary-gradient flex",
          className,
        )}
        {...props}
      >
        搜 嘎
        <span
          className={
            "rotate-12 scale-150 inline-block primary-gradient bg-gradient-to-t"
          }
        >
          {" !"}
        </span>
      </h1>

      {/*{withDescription && <span className={"text-sm"}>全栈 AI 平台</span>}*/}
    </Link>
  )
}

export const AppStatus = () => {
  const [latency] = useAtom(socketLatencyAtom)

  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 p-2 flex items-center gap-1 shrink-0",
      )}
    >
      {latency === 0 ? (
        <BarChart className={"animate-pulse w-4 h-4"} />
      ) : (
        <StatusIcon
          level={latency < 500 ? 3 : latency < 1000 ? 2 : 1}
          className={"w-4 h-4"}
        />
      )}
      <span className={"text-xs text-muted-foreground"}>
        {Math.floor(latency) + " ms"}
      </span>
    </div>
  )
}

export const Partners = () => {
  return (
    <>
      {!!SPONSORS_BANNERS.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto h-8"}>
            {SPONSORS_BANNERS.map((item) => (
              <ImageEqualHeight src={item} key={item} />
            ))}
          </div>
        </>
      )}

      {/*  individual */}
      {!!INDIES_AVATARS.length && (
        <>
          <SeparatorContainer>独立开发者</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto"}>
            {INDIES_AVATARS.map((item) => (
              <Avatar key={item}>
                <AvatarImage src={item} />
              </Avatar>
            ))}
          </div>
        </>
      )}
    </>
  )
}
