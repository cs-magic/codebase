import { ReactNode } from "react"
import { Label } from "../shadcn/shadcn-components/label"

export const LabelLine = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className={"w-full flex items-center justify-between gap-2"}>
      <Label className={"w-32 truncate shrink-0"}>{title}</Label>
      {children}
    </div>
  )
}
