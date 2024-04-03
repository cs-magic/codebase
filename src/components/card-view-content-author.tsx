import { Card } from "@prisma/client"
import { QRCodeSVG } from "qrcode.react"
import moment from "../../packages/common-datetime/moment"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { getPlatformName } from "../core/utils"
import { UserAvatar } from "./user-avatar"

export const ArticleAuthor = ({ card }: { card: Card }) => {
  return (
    <div className={"flex gap-2 items-center shrink-0 h-12 gap-4"}>
      <div className={"flex flex-col overflow-hidden"}>
        <div className={"text-muted-foreground text-xs truncate"}>
          原标题：{card.title}
        </div>

        <div className={"flex items-center gap-1"}>
          <span>
            {!!card?.author && <UserAvatar user={card.author} withName />}
          </span>

          <div className={"text-muted-foreground text-xs mt-1"}>
            {!!card?.time && (
              <span>{moment(card.time).fromNow().replace(/\s+/g, "")}</span>
            )}

            <span>发表于</span>
            <span>{getPlatformName(card.platformType)}</span>
          </div>
        </div>
      </div>

      <div className={"ml-auto flex items-center shrink-0"}>
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
