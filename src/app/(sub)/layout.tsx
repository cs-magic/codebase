import { Header } from "@/components/header"
import { FlexContainer } from "packages/common/components/flex-container"
import { PropsWithChildren } from "react"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0 !gap-0"}>
      <Header withBrand />

      <div className={"grow w-full flex flex-col overflow-hidden"}>
        {children}
      </div>

      {/*<BrandingFooter />*/}
    </FlexContainer>
  )
}
