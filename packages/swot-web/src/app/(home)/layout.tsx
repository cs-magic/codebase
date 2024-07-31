import { FlexContainer } from "@cs-magic/react-ui"
import { Header } from "@cs-magic/swot-frontend/components/header"
import { Footer } from "../../components/footer"
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
