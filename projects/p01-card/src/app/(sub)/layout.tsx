import { Header } from "../../components/header"
import { PropsWithChildren } from "react"
import { cn } from "../../../../common-ui-shadcn/utils"
import { FlexContainer } from "../../../../common-ui/components/flex-container"

export default function SubLayout({ children }: PropsWithChildren) {
  // console.log(ansiColors.red("== SubLayout =="))

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        "!p-0 !gap-0 h-full max-w-[1080px] mx-auto overflow-hidden ",
        // "bg-cyan-800"
      )}
    >
      <Header />

      <div className={"grow w-full flex flex-col overflow-hidden border-t"}>
        {children}
      </div>

      {/*<Footer />*/}
    </FlexContainer>
  )
}
