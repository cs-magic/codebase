import { Tags } from "@/components/card-content-tags"
import { UserAvatar } from "@/components/user-avatar"
import { config } from "@/config"
import {
  cardAuthorRenderedAtom,
  cardCoverRenderedAtom,
  cardUserRenderedAtom,
} from "@/store/card.rendered.atom"
import { getPlatformName } from "@/utils/card-platform/get-platform-name"
import { ICardPreview } from "@cs-magic/p01-common/schema/card"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { useAtom } from "jotai"
import { truncate } from "lodash"
import { prefixes } from "next/dist/build/output/log"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react"
import moment from "../../../../packages-to-classify/datetime/moment"
import { AspectRatio } from "../../../../packages-to-classify/ui-shadcn/components/aspect-ratio"
import { cn } from "../../../../packages-to-classify/ui-shadcn/utils"
import { CsMagicLogoSvg } from "../../../../packages-to-classify/ui/assets"
import { VerticalAspectRatio } from "../../../../packages-to-classify/ui/components/aspect-ratio"
import MarkMap from "../../../../packages-to-classify/visualization/markmap"

export const CardPreview = forwardRef<
  HTMLDivElement,
  {
    user?: IUserSummary | null
    preview?: ICardPreview | null
  }
>(({ preview, user }, ref) => {
  console.log({ user, preview })

  const [, setCardAuthorRendered] = useAtom(cardAuthorRenderedAtom)
  const [, setCardUserRendered] = useAtom(cardUserRenderedAtom)
  const [, setCardCoverRendered] = useAtom(cardCoverRenderedAtom)

  return (
    <div
      ref={ref}
      id={"card-preview"}
      className={cn("font-songti", " card-bg p-4 text-primary2 text-[12px]")}
    >
      <div
        id={"card-preview-outer-header"}
        className={cn(
          "font-pingfang",
          "flex flex-col items-center font-light text-primary2 p-4 gap-2",
        )}
      >
        <div className={"flex items-center font-normal"}>
          <CsMagicLogoSvg className={"w-8 h-8"} />
          <span className={"text-2xl"}>CS魔法社</span>
        </div>

        <div className={"flex text-primary2"}>
          —— 飞脑：你的下一代个人助理 ——
          {/*—— 飞脑：回归人的价值 ——*/}
        </div>
      </div>

      <div
        id={"card-preview-inner-1"}
        className={cn(
          "flex flex-col gap-4 bg-white p-4 relative rounded-tl-[23px] rounded-tr-[10px]",
        )}
      >
        <div
          id={"card-preview-inner-header"}
          className={"flex items-center gap-2 h-10"}
        >
          {user && (
            <UserAvatar
              user={user}
              imageProps={{
                onLoad: () => setCardUserRendered(true),
                onChange: () => setCardUserRendered(false),
              }}
            />
          )}
          <div>
            <div className={"text-[16px]"}>{user?.name}</div>
            <span>分享给你一张卡片</span>
          </div>

          <div className={"ml-auto flex items-center gap-2 h-full"}>
            <div className={"flex flex-col items-end text-light"}>
              {/*<div>{truncate(preview?.inner?.id ?? "", { length: 16 })}</div>*/}
              <div>{moment().format("YYYY-MM-DD")}</div>

              <div>{preview?.inner?.summary?.model}</div>
            </div>

            <div className={"w-[3px] bg-primary2 h-7"} />
          </div>
        </div>

        <div id={"card-preview-inner-cover"}>
          <AspectRatio ratio={2.35} className={"overflow-hidden rounded-lg"}>
            {preview?.inner?.cover?.url && (
              <Image
                src={preview?.inner?.cover?.url}
                fill
                alt={"cover"}
                className={"object-cover h-auto"}
                onLoad={() => setCardCoverRendered(true)}
                onChange={() => setCardCoverRendered(false)}
              />
            )}
          </AspectRatio>
        </div>

        <div
          id={"card-preview-inner-title"}
          className={"text-[16px] font-black text-justify"}
        >
          {preview?.inner?.title}
        </div>

        <div id={"card-preview-inner-description"} className={"text-justify"}>
          {preview?.inner?.summary?.parsed.description}
        </div>

        <div className={"bg-gray-50 rounded-lg p-2 bg-dots"}>
          <MarkMap content={preview?.inner?.summary?.parsed.mindmap} />
        </div>

        <Tags tags={preview?.inner?.summary?.parsed.tags} />
      </div>

      <div
        className={cn(
          // " card-notch-2",
          "ticket w-full flex items-center justify-center px-4",
        )}
      >
        <div
          className={cn("w-full h-[1px]")}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgba(199,199,199)' stroke-width='4' stroke-dasharray='5%2c 10' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div id={"inner-2"} className={"bg-white p-4 rounded-b-[10px]"}>
        <div
          id={"card-preview-inner-bottom"}
          className={"flex items-center gap-2 h-8"}
        >
          <UserAvatar
            imageProps={{
              onLoad: () => setCardAuthorRendered(true),
              onChange: () => setCardUserRendered(false),
            }}
            user={preview?.inner?.author ?? null}
            avatarProps={{ className: "rounded-none" }}
          />
          <div className={"text-[10px] text-gray-500 font-light"}>
            <div>{preview?.inner?.author?.name}</div>
            <div>
              <span>
                {moment(preview?.inner?.time).fromNow().replace(/\s+/g, "")}
              </span>
              <span>发表于</span>
              <span>{getPlatformName(preview?.inner?.platformType)}</span>
            </div>
          </div>

          <div className={"ml-auto flex h-full shrink-0 items-center"}>
            {/*<div className={"w-8 text-xs text-muted-foreground"}>查看原文</div>*/}
            <VerticalAspectRatio ratio={1}>
              <QRCodeSVG
                value={preview?.inner?.sourceUrl ?? ""}
                className={"h-full w-full"}
              />
            </VerticalAspectRatio>
          </div>
        </div>
      </div>

      <div className={"flex flex-col items-end p-2 text-primary2/10"}>
        <div>
          {preview?.inner?.id}@{config.version}
        </div>
        {/*<div></div>*/}
      </div>
    </div>
  )
})
CardPreview.displayName = "CardPreview"
