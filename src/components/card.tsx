import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef, HTMLAttributes } from "react"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { BilibiliDisplayType } from "../../packages/common-bilibili/schema"
import moment from "../../packages/common-datetime/moment"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { config } from "../config/system"
import { IUserSummary } from "../schema/user.summary"
import { UserAvatar } from "./user-avatar"

export type CardType = "text-image" | "text-video" | "text-gif"

export type ICard<T extends CardType = any> = {
  type: T

  user?: IUserSummary
  updatedAt: Date

  resourceUrl?: string
  content?: string
  sourceUrl?: string
  coverRatio?: number
}

export const Card = forwardRef<
  HTMLDivElement,
  { card: ICard } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // 如果加overflow-auto，可以实现图片的圆角，但会导致 html-to-image 的bug
        "rounded-lg card-bg flex flex-col",
        className,
      )}
      {...props}
    >
      <div className={"w-full"}>
        <AspectRatio ratio={card.coverRatio ?? 1}>
          {card.type === "text-image" && card.resourceUrl && (
            <Image
              src={
                // "https://picsum.photos/300/200"
                card.resourceUrl
              }
              alt={""}
              fill
              className={"w-full h-auto rounded-t-lg"}
            />
          )}

          {card.type === "text-video" && card.resourceUrl && (
            <BilibiliVideo video={{ url: card.resourceUrl, height: 240 }} />
          )}
        </AspectRatio>
      </div>

      <div className={"flex flex-col gap-2 p-4"}>
        <MarkdownComp className={"line-clamp-[10]"}>
          {card.content ?? "No Content Yet"}
        </MarkdownComp>

        {card.sourceUrl && (
          <QRCodeSVG
            value={card.sourceUrl}
            className={"w-12 h-12 m-2 ml-auto"}
          />
        )}

        <Separator orientation={"horizontal"} className={"bg-gray-100/10"} />

        <div
          className={
            "text-muted-foreground text-xs flex items-center justify-between"
          }
        >
          <div className={"flex gap-2 items-center justify-end"}>
            {card.user ? (
              <>
                <UserAvatar user={card.user} />
                <Label>{card.user.name}</Label>
              </>
            ) : (
              "no user"
            )}
          </div>

          <div className={"flex items-center gap-2"}>
            <span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>

            <span>from {config.website.title}</span>
          </div>
        </div>
      </div>
    </div>
  )
})
Card.displayName = "Card"
