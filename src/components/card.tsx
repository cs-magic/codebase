import Image from "next/image"
import {
  BilibiliDisplayType,
  BilibiliVideo,
} from "../../packages/common-bilibili/componnets"
import moment from "../../packages/common-datetime/moment"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui/shadcn/shadcn-components/aspect-ratio"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
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

export const Card = <T extends CardType>({ card }: { card: ICard<T> }) => {
  return (
    <div
      className={"rounded-lg overflow-hidden card-bg w-[420px] flex flex-col"}
    >
      {card.type === "plain" && (
        <div className={"w-full "}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={"https://picsum.photos/300/200"}
              alt={""}
              fill
              className={"w-full h-auto"}
            />
          </AspectRatio>
        </div>
      )}

      {card.type === "bilibili" && (
        <BilibiliVideo
          displayType={card.displayType}
          video={{ url: card.src, height: 240 }}
        />
      )}

      <div className={"flex flex-col gap-2 p-4"}>
        <MarkdownComp>{card.content}</MarkdownComp>

        <div className={"flex gap-2 items-center justify-end"}>
          <UserAvatar user={card.user} />
          <Label>{card.user.name}</Label>
        </div>

        <Separator orientation={"horizontal"} className={"bg-gray-100/10"} />

        <div
          className={
            "text-muted-foreground text-xs flex items-center justify-between"
          }
        >
          <span>由 {config.website.title} 生成</span>

          <span>{moment().from(card.updatedAt).toString()}</span>
        </div>
      </div>
    </div>
  )
}
