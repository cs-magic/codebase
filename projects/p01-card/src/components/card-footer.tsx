"use client";

import { ICardDetail } from "@cs-magic/prisma/schema/card.detail";
import {
  CalendarHeartIcon,
  FingerprintIcon,
  MilestoneIcon,
} from "lucide-react";
import moment from "../../../../packages/datetime/moment";
import { cn } from "../../../../packages/ui-shadcn/utils";

import { config } from "../config";
import { CardFooterItem } from "./card-footer-item";

export const CardFooter = ({ card }: { card?: ICardDetail | null }) => {
  return (
    <div
      className={cn("shrink-0 px-4 py-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex items-center justify-center gap-2"}>
        <CardFooterItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        <CardFooterItem Icon={FingerprintIcon} value={card?.id} />
        <CardFooterItem Icon={MilestoneIcon} value={config.version} />
      </div>
    </div>
  );
};
