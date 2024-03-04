import { Header } from "@/components/header"
import React, { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/footer"
import { FlexContainer } from "../../../packages/common/components/flex-container"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0"}>
      <Header />

      <div className={"grow w-full"}>{children}</div>

      <BrandingFooter />
    </FlexContainer>
  )
}
