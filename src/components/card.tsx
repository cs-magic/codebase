"use client"

import { useAtom } from "jotai"
import { first } from "lodash"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef, HTMLAttributes, useRef } from "react"
import { useMeasure } from "react-use"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { cn } from "../../packages/common-ui-shadcn/utils"
import {
  useAutoCardContent,
  useInitCardContent,
} from "../hooks/use-card-content"
import { CardType, ICard, Media } from "../schema/card"
import {
  bilibiliVideoControlEnabledAtom,
  cardRenderedContentAtom,
} from "../store/card.atom"
import { CardMedia } from "./card-media"
import { UserAvatar } from "./user-avatar"

export const Card = forwardRef<
  HTMLDivElement,
  { card: ICard } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  const [content] = useAtom(cardRenderedContentAtom)
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)

  useInitCardContent({ card })

  const refText = useRef<HTMLDivElement>(null)
  useAutoCardContent({ refText })

  const { type, body } = card
  const m: Partial<Record<CardType, Media[] | undefined>> = {
    "text-image": body?.images,
    "text-iframe": body?.iFrames,
    "text-video": body?.videos,
  }
  const media = first(m[type])

  const [refMedia, { width, height }] = useMeasure<HTMLDivElement>()

  const padding = 24

  console.log("-- card: ", { content })

  return (
    <div
      ref={ref}
      className={cn("rounded-lg corner-gradient p-6 min-w-[367px]", className)}
      style={{
        padding,
        width:
          padding * 2 +
          (card.type === "text-iframe" && bilibiliVideoControlEnabled
            ? 420
            : 419),
      }}
      {...props}
    >
      <AspectRatio ratio={8 / 16}>
        <div className={"w-full h-full overflow-hidden flex flex-col"}>
          <h1 className={"text-black font-medium my-2 shrink-0"}>Area #1</h1>

          <div
            className={
              "w-full grow overflow-hidden rounded-lg flex flex-col bg-white text-black gap-2"
            }
          >
            <div id={"card-media"} className={"w-full shrink-0"}>
              {media && (
                <AspectRatio ratio={media.width / media.height} ref={refMedia}>
                  <CardMedia
                    width={width}
                    height={height}
                    url={media.url}
                    type={card.type}
                  />
                </AspectRatio>
              )}
            </div>

            <div className={"px-2 grow overflow-hidden relative flex flex-col"}>
              <div ref={refText} className={"grow overflow-hidden"}>
                <MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>
              </div>

              {card.body?.sourceUrl && (
                <QRCodeSVG
                  value={card.body.sourceUrl}
                  className={"w-12 h-12 m-2 ml-auto shrink-0"}
                />
              )}
            </div>
          </div>

          <div
            className={
              "text-muted-foreground text-xs flex items-center justify-between p-2"
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
              {/*<span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>*/}

              <span>PROJECT 1</span>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  )
})
Card.displayName = "Card"
