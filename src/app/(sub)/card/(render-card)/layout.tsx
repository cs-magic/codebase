import { PropsWithChildren } from "react"
import { cn } from "../../../../../packages/common-ui-shadcn/utils"
import { GenCardDisplayControl } from "../../../../components/gen-card-display-control"
import { GenCardPreview } from "../../../../components/gen-card-preview"
import { StandardCard } from "../../../../components/standard-card"

const RenderCardContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "w-full h-full mx-auto gap-4 p-2 sm:p-4 flex flex-wrap overflow-auto",
      )}
    >
      <div className={"grow overflow-auto h-full p-2 -mx-2"}>
        <StandardCard title={"Input Control"}>{children}</StandardCard>

        <GenCardDisplayControl />
      </div>

      <div className={"w-full sm:max-w-[375px] overflow-auto"}>
        <GenCardPreview />
      </div>
    </div>
  )
}

export default RenderCardContainer
