import Image from "next/image"
import { HTMLAttributes } from "react"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { BilibiliDisplayType } from "../../packages/common-bilibili/schema"
import moment from "../../packages/common-datetime/moment"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui/shadcn/shadcn-components/aspect-ratio"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { config } from "../config/system"
import { IUserSummary } from "../schema/user.summary"
import { UserAvatar } from "./user-avatar"

export type CardType = "plain" | "bilibili"

export type ICardBase<T extends CardType> = {
  user: IUserSummary
  content: string
  updatedAt: Date
  type: T
}

export type ICard<T extends CardType> = T extends "bilibili"
  ? ICardBase<T> & { src: string; displayType: BilibiliDisplayType }
  : ICardBase<T> & { backgroundImage: string }

export const Card = <T extends CardType>({
  card,
  className,
  ...props
}: { card: ICard<T> } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden card-bg flex flex-col",
        "w-[420px]",
        className,
      )}
      {...props}
    >
      <div className={"w-full "}>
        <AspectRatio ratio={16 / 9}>
          {card.type === "plain" && (
            <Image
              src={"https://picsum.photos/300/200"}
              alt={""}
              fill
              className={"w-full h-auto"}
            />
          )}

          {card.type === "bilibili" && (
            <BilibiliVideo
              displayType={card.displayType}
              video={{ url: card.src, height: 240 }}
            />
          )}
        </AspectRatio>
      </div>

      <div className={"flex flex-col gap-2 p-4"}>
        <MarkdownComp>{card.content}</MarkdownComp>

        <Separator orientation={"horizontal"} className={"bg-gray-100/10"} />

        <div
          className={
            "text-muted-foreground text-xs flex items-center justify-between"
          }
        >
          <div className={"flex gap-2 items-center justify-end"}>
            <UserAvatar user={card.user} />
            <Label>{card.user.name}</Label>
          </div>

          <div className={"flex items-center gap-2"}>
            <span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>

            <span>from {config.website.title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
