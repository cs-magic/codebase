"use client"
import React from "react"
import { BrandTitle } from "@/components/branding"
import { HomeQueryArea } from "@/components/home-query-area"
import { FlexContainer } from "../../../packages/common/components/flex-container"

export default function HomePage() {
  return (
    <FlexContainer
      orientation={"vertical"}
      className={"w-full sm:w-3/5 mx-auto justify-start"}
    >
      <div className={"h-1/5"} />
      <BrandTitle className={"py-4 sm:py-8"} />

      {/*<TV />*/}

      <HomeQueryArea />
    </FlexContainer>
  )
}
