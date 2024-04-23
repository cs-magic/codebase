"use client"

import { config } from "@/config"

import { CardOuterPreview } from "@/schema/card"
import { CalendarHeartIcon, MilestoneIcon } from "lucide-react"
import moment from "../../../../packages-to-classify/datetime/moment"
import { cn } from "../../../../packages-to-classify/ui-shadcn/utils"
import { CardFooterItem } from "./card-footer-item"

export const CardFooter = ({
  outPreview,
}: {
  outPreview?: CardOuterPreview | null
}) => {
  return (
    <div
      className={cn("shrink-0 px-4 py-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex items-center justify-center gap-2"}>
        <CardFooterItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        {/*<CardFooterItem Icon={FingerprintIcon} value={outPreview?.id} />*/}
        <CardFooterItem Icon={MilestoneIcon} value={config.version} />
      </div>
    </div>
  )
}
