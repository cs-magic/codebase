"use client"

import { useAtom } from "jotai"
import { first } from "lodash"
import {
  EyeIcon,
  HeartIcon,
  LucideIcon,
  MessageSquareTextIcon,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import {
  Component,
  ComponentType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useRef,
} from "react"
import { useMeasure } from "react-use"
import moment from "../../packages/common-datetime/moment"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"
import { cn } from "../../packages/common-ui-shadcn/utils"
import MarkMap from "../../packages/common-visualization/markmap"
import {
  useAutoCardContent,
  useInitCardContent,
} from "../hooks/use-card-content"
import { CardType, ICard, IMedia } from "../schema/card"
import {
  bilibiliVideoControlEnabledAtom,
  cardRenderedContentAtom,
} from "../store/card.atom"
import { CardMedia } from "./card-media"
import { UserAvatar } from "./user-avatar"

export const Card = forwardRef<
  HTMLDivElement,
  {
    card: ICard
  } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  const [content] = useAtom(cardRenderedContentAtom)
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)

  useInitCardContent({ card })

  const refText = useRef<HTMLDivElement>(null)
  useAutoCardContent({ refText })

  const { type, body } = card
  const m: Partial<Record<CardType, IMedia[] | undefined>> = {
    "text-image": body?.images,
    "text-iframe": body?.iFrames,
    "text-video": body?.videos,
  }
  const media = first(m[type])

  const [refMedia, { width, height }] = useMeasure<HTMLDivElement>()

  const padding = 24

  // console.log("-- card: ", { content })

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
                <AspectRatio
                  ratio={
                    media.dimension
                      ? media.dimension.width / media.dimension.height
                      : card.body?.platform === "wechat-article"
                        ? 2.35 // ref: 微信公众号文章封面尺寸, https://developers.weixin.qq.com/community/develop/article/doc/0004cebac584a8fcd55bad86656413
                        : 16 / 9
                  }
                  ref={refMedia}
                >
                  <CardMedia cardType={card.type} media={media} />
                </AspectRatio>
              )}
            </div>

            <div className={"p-2 grow overflow-hidden relative flex flex-col"}>
              <div
                ref={refText}
                className={"grow overflow-hidden flex flex-col gap-2"}
              >
                {body?.title && (
                  <h1 className={"truncate text-xl font-medium"}>
                    {body.title}
                  </h1>
                )}

                <div className={"flex gap-2 items-center shrink-0 h-12"}>
                  {!!body?.author && (
                    <UserAvatar user={body.author} size={"md"} />
                  )}

                  <div className={"flex flex-col"}>
                    <span>{body?.author?.name}</span>
                    {!!body?.time && (
                      <span className={"text-muted-foreground text-xs"}>
                        {moment(body.time).format("ll")}
                      </span>
                    )}
                  </div>

                  <div className={"ml-auto flex flex-col items-end"}>
                    {card.body?.sourceUrl && (
                      <div className={"w-8"}>
                        <AspectRatio ratio={1}>
                          <QRCodeSVG
                            value={card.body.sourceUrl}
                            className={"w-full h-full"}
                          />
                        </AspectRatio>
                      </div>
                    )}
                  </div>
                </div>

                {body?.mindmap && (
                  <div className={"grow overflow-hidden"}>
                    <MarkMap content={body.mindmap} />
                  </div>
                )}

                {/*<MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>*/}
              </div>
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

export const StatItem = ({
  Icon,
  value,
}: {
  Icon: LucideIcon
  value: number
}) => {
  const v =
    value >= 1e5
      ? "10w+"
      : value >= 1e4
        ? `${Math.floor(value / 1e4)}w+`
        : value >= 1e3
          ? `${Math.floor(value / 1e3)}k+`
          : value

  return (
    <div className={"flex flex-col items-center w-8"}>
      <Icon className={"w-8"} />
      <span className={"text-muted-foreground"}>{v}</span>
    </div>
  )
}
