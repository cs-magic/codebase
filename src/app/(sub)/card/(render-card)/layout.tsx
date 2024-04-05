import { PropsWithChildren } from "react"
import { cn } from "../../../../../packages/common-ui-shadcn/utils"
import { GenCardConfigDisplay } from "../../../../components/gen-card-config-display"
import { GenCardPreview } from "../../../../components/gen-card-preview"
import { StandardCard } from "../../../../components/standard-card"

const RenderCardContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "justify-start overflow-auto w-full mx-auto gap-4 p-2 sm:p-4",
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      )}
    >
      <StandardCard title={"Input Control"}>{children}</StandardCard>

      <GenCardConfigDisplay />

      <GenCardPreview />
    </div>
  )
}

export default RenderCardContainer
