import { Card } from "@prisma/client"
import { QRCodeSVG } from "qrcode.react"
import moment from "../../packages/common-datetime/moment"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { getPlatformName } from "../core/utils"
import { UserAvatar } from "./user-avatar"

export const ArticleAuthor = ({ card }: { card: Card }) => {
  return (
    <div className={"flex gap-2 items-center shrink-0 h-12"}>
      {!!card?.author && <UserAvatar user={card.author} />}

      <div className={"flex flex-col"}>
        <span>
          <span>{card?.author?.name}</span>
        </span>
        {!!card?.time && (
          <span className={"text-muted-foreground text-xs"}>
            {moment(card.time).format("ll")}（来自：
            {getPlatformName(card.platformType)}）
          </span>
        )}
      </div>

      <div className={"ml-auto flex items-center"}>
        {card?.sourceUrl && (
          <>
            {/*<div className={"w-8 text-xs text-muted-foreground"}>查看原文</div>*/}
            <div className={"w-8"}>
              <AspectRatio ratio={1}>
                <QRCodeSVG value={card.sourceUrl} className={"w-full h-full"} />
              </AspectRatio>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
