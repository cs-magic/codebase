import { LucideIcon } from "lucide-react"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"

export const CardFooterItem = ({
  Icon,
  value,
}: {
  Icon: LucideIcon
  value?: string
}) => {
  return (
    <FlexContainer
      orientation={"vertical"}
      className={"!gap-1 overflow-hidden"}
    >
      <Icon />
      <span className={"text-nowrap truncate text-xs"}>{value ?? "-"}</span>
    </FlexContainer>
  )
}
