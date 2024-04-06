"use client"

import { useAtom, useAtomValue } from "jotai"
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

import { config } from "../config/system"
import { cardAtom, summaryAtom } from "../store/card.atom"

export const CardFooter = () => {
  const summary = useAtomValue(summaryAtom)
  const [card] = useAtom(cardAtom)

  return (
    <div
      className={cn("shrink-0 pb-2 px-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex  items-center justify-center"}>
        <VerticalItem
          Icon={PackageIcon}
          value={summary?.modelType?.toUpperCase()}
        />
        <VerticalItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        <VerticalItem Icon={FingerprintIcon} value={card?.id} />
        <VerticalItem Icon={MilestoneIcon} value={config.version} />
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
  return (
    <FlexContainer
      orientation={"vertical"}
      className={"!gap-1 overflow-hidden"}
    >
      <Icon />
      <span className={"text-nowrap"}>{value ?? "Unknown"}</span>
    </FlexContainer>
  )
}
