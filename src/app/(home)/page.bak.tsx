"use client"
import { TVContainer } from "@/components/tv-container"
import { useAtom } from "jotai"
import React from "react"
import { FlexContainer } from "../../../packages/common/components/flex-container"
import { cn } from "../../../packages/common/lib/utils"
import { userPromptAtom } from "../../../packages/common/store/user"
import { HomeQueryInput } from "../../components/home-query-input"

export default function HomePage() {
  const [prompt] = useAtom(userPromptAtom)

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        // 水平方向确保居中，且不要过宽
        "w-full sm:w-3/5 max-w-[640px] mx-auto",
        // 垂直方向不要居中，参考谷歌允许上部固定，保证下拉框增长时不要有 layout shift
        "justify-end",
      )}
    >
      {/*<div className={"h-1/4 sm:h-1/5 w-full "} />*/}

      {/*<BrandingTitle className={"py-4 sm:py-8"} />*/}

      <div className={"grow w-full overflow-hidden"}>
        <TVContainer>{prompt || "hello world !"}</TVContainer>
      </div>

      <div className={"w-full h-1/2 shrink-0"}>
        <HomeQueryInput />
      </div>
    </FlexContainer>
  )
}
