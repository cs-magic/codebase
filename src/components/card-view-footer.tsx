import { useAtom } from "jotai"
import {
  CalendarHeartIcon,
  FingerprintIcon,
  LucideIcon,
  MilestoneIcon,
  PackageIcon,
} from "lucide-react"
import moment from "../../packages/common-datetime/moment"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { project } from "../config/card"
import { cardAtom } from "../store/card.atom"

export const CardFooter = () => {
  const [card] = useAtom(cardAtom)

  return (
    <div
      className={cn("shrink-0 pb-2 px-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex  items-center justify-center"}>
        <VerticalItem
          Icon={PackageIcon}
          value={card?.model?.name.toUpperCase()}
        />
        <VerticalItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        <VerticalItem Icon={FingerprintIcon} value={card?.id} />
        <VerticalItem Icon={MilestoneIcon} value={project.version} />
      </div>
    </div>
  )
}

export const VerticalItem = ({
  Icon,
  value,
}: {
  Icon: LucideIcon
  value?: string
}) => {
  if (!value) return null

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"!gap-1 overflow-hidden"}
    >
      <Icon />
      <span className={"text-nowrap"}>{value}</span>
    </FlexContainer>
  )
}
