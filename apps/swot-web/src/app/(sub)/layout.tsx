import { FlexContainer } from "@cs-magic/ui"
import { cn } from "@cs-magic/common"
import { Header } from "../../components/header"
import { PropsWithChildren } from "react"

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
