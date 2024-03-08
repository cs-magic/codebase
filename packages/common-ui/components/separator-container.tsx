import { PropsWithChildren } from "react"
import { Separator } from "../shadcn/shadcn-components/separator"

export const SeparatorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={"w-full flex items-center justify-center overflow-hidden"}>
      <Separator orientation={"horizontal"} className={"grow"} />
      <div className={" text-xs text-muted-foreground shrink-0 mx-4"}>
        {children}
      </div>
      <Separator orientation={"horizontal"} className={"grow"} />
    </div>
  )
}
