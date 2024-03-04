"use client"
import React from "react"
import { HomeQueryArea } from "@/components/home-query-area"
import { FlexContainer } from "../../../packages/common/components/flex-container"
import { cn } from "../../../packages/common/lib/utils"

import { TVContainer } from "@/components/tv-container"
import { useAtom } from "jotai"
import { userPromptAtom } from "../../../packages/common/store/user"
import { BrandingTitle } from "@/components/branding-title"

export default function HomePage() {
  const [prompt] = useAtom(userPromptAtom)

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        // 水平方向确保居中，且不要过宽
        "w-full sm:w-3/5 max-w-[640px] mx-auto",
        // 垂直方向不要居中，参考谷歌允许上部固定，保证下拉框增长时不要有 layout shift
        "justify-start",
      )}
    >
      {/*<div className={"h-1/4 sm:h-1/5 w-full "} />*/}

      {/*<BrandingTitle className={"py-4 sm:py-8"} />*/}

      <TVContainer>{prompt || "hello world !"}</TVContainer>

      <HomeQueryArea />
    </FlexContainer>
  )
}
