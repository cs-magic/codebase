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
    <div className={"w-full flex items-center justify-between gap-2 "}>
      <div className={"w-28 truncate shrink-0"}>{title}</div>
      <div className={"grow"}>{children}</div>
    </div>
  )
}
