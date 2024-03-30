"use client"

import { useAtom } from "jotai"
import { first } from "lodash"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef, HTMLAttributes, useRef } from "react"
import { useMeasure } from "react-use"
import moment from "../../packages/common-datetime/moment"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { cn } from "../../packages/common-ui-shadcn/utils"
import MarkMap from "../../packages/common-visualization/markmap"
import {
  useAutoCardContent,
  useInitCardContent,
} from "../hooks/use-card-content"
import { CardType, ICard, ICardBody, IMedia } from "../schema/card"
import { IUserSummary } from "../schema/user.summary"
import { bilibiliVideoControlEnabledAtom } from "../store/card.atom"
import { CardMedia } from "./card-media"
import { UserAvatar } from "./user-avatar"

export const PROJECT_NAME = "产品名"

export const Card = forwardRef<
  HTMLDivElement,
  {
    card: ICard
  } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)

  useInitCardContent({ card })

  const padding = 24

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
          <CardHeader user={card.user} />

          <CardContent card={card} />

          <CardFooter />
        </div>
      </AspectRatio>
    </div>
  )
})
Card.displayName = "Card"

export const CardFooter = () => {
  return (
    <div className={"h-16 shrink-0 flex items-center text-slate-500"}>
      标题/思维导图由 <span className={"font-medium mx-1"}>Kimi大模型</span>{" "}
      生成
    </div>
  )
}

export const CardHeader = ({ user }: { user: IUserSummary | null }) => {
  return (
    <div
      className={
        "text-muted-foreground text-xs flex items-center justify-between p-2"
      }
    >
      <div className={"flex gap-2 items-center justify-end"}>
        {user ? (
          <>
            <UserAvatar user={user} />
            <Label>{user.name}</Label>
          </>
        ) : (
          "no user"
        )}{" "}
        {/*分享给你一张卡片*/}
        推荐一张卡片，理由：我真的是会谢！
      </div>

      <div className={"flex items-center gap-2"}>
        {/*<span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>*/}

        <span className={"text-primary-foreground text-lg font-medium"}>
          {PROJECT_NAME}
        </span>
      </div>
    </div>
  )
}

export const AuthorLine = ({ body }: { body: ICardBody }) => {
  return (
    <div className={"flex gap-2 items-center shrink-0 h-12"}>
      {!!body?.author && <UserAvatar user={body.author} />}

      <div className={"flex flex-col"}>
        <span>
          <span>{body?.author?.name}</span>
        </span>
        {!!body?.time && (
          <span className={"text-muted-foreground text-xs"}>
            {moment(body.time).format("ll")}（来自：{body.source}）
          </span>
        )}
      </div>

      <div className={"ml-auto flex flex-col items-end"}>
        {body?.sourceUrl && (
          <div className={"w-8"}>
            <AspectRatio ratio={1}>
              <QRCodeSVG value={body.sourceUrl} className={"w-full h-full"} />
            </AspectRatio>
          </div>
        )}
      </div>
    </div>
  )
}

export const CardContent = ({ card }: { card: ICard }) => {
  const { type, body } = card
  const m: Partial<Record<CardType, IMedia[] | undefined>> = {
    "text-image": body?.images,
    "text-iframe": body?.iFrames,
    "text-video": body?.videos,
  }

  const refText = useRef<HTMLDivElement>(null)
  useAutoCardContent({ refText })

  const media = first(m[type])

  const [refMedia, { width, height }] = useMeasure<HTMLDivElement>()

  return (
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
            <h1 className={"truncate text-xl font-medium"}>{body.title}</h1>
          )}

          {body?.mindmap && (
            <div className={"grow overflow-hidden"}>
              <MarkMap content={body.mindmap} />
            </div>
          )}

          {body && <AuthorLine body={body} />}

          {/*<MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>*/}
        </div>
      </div>
    </div>
  )
}
