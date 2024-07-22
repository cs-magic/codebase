import { FlexContainer } from "@cs-magic/ui"
import { Footer } from "../../components/footer"
import { Header } from "../../components/header"
import React, { PropsWithChildren } from "react"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0"}>
      <Header />

      <div className={"w-full grow overflow-auto"}>{children}</div>

      <Footer />
    </FlexContainer>
  )
}
