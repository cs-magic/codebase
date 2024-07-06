"use client"

import { config } from "@cs-magic/common"

import { CardOuterPreview } from "@cs-magic/wechat/schema/card"
import { CalendarHeartIcon, MilestoneIcon } from "lucide-react"
import { moment } from "@cs-magic/common"
import { cn } from "@cs-magic/common"
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
