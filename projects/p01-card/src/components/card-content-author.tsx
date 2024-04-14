import { Card } from "@prisma/client"
import { useAtom, useSetAtom } from "jotai"
import { QRCodeSVG } from "qrcode.react"
import { useEffect } from "react"
import { safeParseJson } from "../../../common-common/safe-parse-json"
import moment from "../../../common-datetime/moment"
import { cn } from "../../../common-ui-shadcn/utils"
import { VerticalAspectRatio } from "../../../common-ui/components/aspect-ratio"
import { getPlatformName } from "../core/utils"
import {
  cardAuthorRenderedAtom,
  cardAuthorWithTitleAtom,
} from "../store/card.atom"
import { UserAvatar } from "./user-avatar"

export const CardContentAuthor = ({ card }: { card?: Card | null }) => {
  // console.log("-- author: ", card?.author)

  const [withRawTitle] = useAtom(cardAuthorWithTitleAtom)

  const Line1 = () => (
    <div className={"text-muted-foreground text-xs truncate"}>
      原标题：{card?.title}
    </div>
  )

  const Line21 = () => (
    <span className={"mr-1 text-nowrap"}>
      {safeParseJson(card?.author)?.name}
    </span>
  )

  const Line22 = () => (
    <div>
      {!!card?.time && (
        <span>{moment(card.time).fromNow().replace(/\s+/g, "")}</span>
      )}

      <span>发表于</span>
      <span>{getPlatformName(card?.platformType)}</span>
    </div>
  )

  const Line2 = () => (
    <div
      className={cn(
        "flex gap-0.5 text-muted-foreground text-xs ",
        !withRawTitle && "flex-col",
      )}
    >
      <Line21 />
      <Line22 />
    </div>
  )

  const setAuthorRendered = useSetAtom(cardAuthorRenderedAtom)
  useEffect(() => {
    setAuthorRendered(false)
  }, [card?.author?.avatar])

  return (
    <div className={"flex items-center shrink-0 h-8"}>
      <VerticalAspectRatio ratio={1} className={"shrink-0"}>
        {!!card?.author && (
          <UserAvatar
            imageProps={{ onLoad: () => setAuthorRendered(true) }}
            user={card.author}
          />
        )}
      </VerticalAspectRatio>

      <div className={"flex flex-col justify-center overflow-hidden mx-2"}>
        {withRawTitle ? (
          <>
            <Line1 />
            <Line2 />
          </>
        ) : (
          <Line2 />
        )}
      </div>

      <div className={"ml-auto flex items-center shrink-0 h-full"}>
        {card?.sourceUrl && (
          <>
            {/*<div className={"w-8 text-xs text-muted-foreground"}>查看原文</div>*/}
            <VerticalAspectRatio ratio={1}>
              <QRCodeSVG value={card.sourceUrl} className={"w-full h-full"} />
            </VerticalAspectRatio>
          </>
        )}
      </div>
    </div>
  )
}
