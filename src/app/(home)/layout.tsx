import { Header } from "@/components/header"
import React, { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/footer"
import { FlexContainer } from "../../../packages/common/components/flex-container"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0"}>
      <Header withBrand />

      <div className={"grow w-full overflow-auto"}>{children}</div>

      <BrandingFooter />
    </FlexContainer>
  )
}
