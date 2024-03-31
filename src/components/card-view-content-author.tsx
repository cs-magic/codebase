import { CardBody } from "@prisma/client"
import { QRCodeSVG } from "qrcode.react"
import moment from "../../packages/common-datetime/moment"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { getPlatformName } from "../core/utils"
import { UserAvatar } from "./user-avatar"

export const ArticleAuthor = ({ body }: { body: CardBody }) => {
  return (
    <div className={"flex gap-2 items-center shrink-0 h-12"}>
      {!!body?.author && <UserAvatar user={body.author} />}

      <div className={"flex flex-col"}>
        <span>
          <span>{body?.author?.name}</span>
        </span>
        {!!body?.time && (
          <span className={"text-muted-foreground text-xs"}>
            {moment(body.time).format("ll")}（来自：
            {getPlatformName(body.platformType)}）
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
