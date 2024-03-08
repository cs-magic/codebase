import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import React, { PropsWithChildren } from "react"
import { FlexContainer } from "../../../packages/common-ui/components/flex-container"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0"}>
      <Header />

      <div className={"grow w-full overflow-auto"}>{children}</div>

      <Footer />
    </FlexContainer>
  )
}
