import { Header } from "@/components/header"
import { FlexContainer } from "../../../packages/common-ui/components/flex-container"
import { PropsWithChildren } from "react"
import { cn } from "../../../packages/common-ui/shadcn/utils"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        "!p-0 !gap-0 h-full overflow-hidden",
        // "bg-cyan-800"
      )}
    >
      <Header />

      <div className={"grow w-full flex flex-col overflow-hidden"}>
        {children}
      </div>

      {/*<Footer />*/}
    </FlexContainer>
  )
}
