import { Header } from "../../components/header"
import { PropsWithChildren } from "react"
import { cn } from "@cs-magic/common/ui-shadcn/utils"
import { FlexContainer } from "@cs-magic/common/ui/components/flex-container"

export default function SubLayout({ children }: PropsWithChildren) {
  // console.log(ansiColors.red("== SubLayout =="))

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        "mx-auto h-full max-w-[1080px] !gap-0 overflow-hidden !p-0 ",
        // "bg-cyan-800"
      )}
    >
      <Header />

      <div className={"flex w-full grow flex-col overflow-hidden border-t"}>
        {children}
      </div>

      {/*<Footer />*/}
    </FlexContainer>
  )
}
