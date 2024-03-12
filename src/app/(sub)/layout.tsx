import { Header } from "@/components/header"
import { FlexContainer } from "../../../packages/common-ui/components/flex-container"
import { PropsWithChildren } from "react"
import { cn } from "../../../packages/common-ui/shadcn/utils"
import ansiColors from "ansi-colors"

export default function SubLayout({ children }: PropsWithChildren) {
  console.log(ansiColors.red("== SubLayout =="))

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        "!p-0 !gap-0 h-full overflow-hidden ",
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
