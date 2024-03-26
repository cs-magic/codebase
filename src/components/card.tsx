import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef, HTMLAttributes, useRef } from "react"
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
  const refText = useRef<HTMLDivElement>(null)
  const overflow =
    !!refText.current &&
    refText.current.scrollHeight > refText.current.clientHeight

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden corner-gradient p-6 w-[367px]",
        className,
      )}
      {...props}
    >
      <AspectRatio ratio={8 / 16}>
        <div className={"h-full overflow-hidden flex flex-col"}>
          <h1 className={"text-black font-medium my-2 shrink-0"}>Area #1</h1>

          <div
            className={
              "grow overflow-hidden rounded-lg flex flex-col bg-white text-black gap-2"
            }
          >
            <div className={"shrink-0"}>
              <AspectRatio ratio={card.coverRatio ?? 1}>
                {card.type === "text-image" && card.resourceUrl && (
                  <Image
                    src={
                      // "https://picsum.photos/300/200"
                      card.resourceUrl
                    }
                    alt={""}
                    fill
                    className={"w-full h-auto"}
                  />
                )}

                {card.type === "text-video" && card.resourceUrl && (
                  <BilibiliVideo
                    video={{ url: card.resourceUrl, height: 240 }}
                  />
                )}
              </AspectRatio>
            </div>

            <div ref={refText} className={"px-2 grow overflow-hidden relative"}>
              <div
                className={
                  "w-12 h-full float-right flex flex-col justify-end ml-2"
                }
                style={{
                  shapeOutside: "inset(calc(100% - 56px) 0 8px 0)",
                }}
              >
                {card.sourceUrl && (
                  <QRCodeSVG
                    value={card.sourceUrl}
                    className={"w-12 h-12 mb-2"}
                  />
                )}
              </div>

              <MarkdownComp>{card.content ?? "No Content Yet"}</MarkdownComp>

              {/*{overflow && (*/}
              {/*  <div*/}
              {/*    className={*/}
              {/*      "absolute right-[72px] bottom-0 bg-white text-black"*/}
              {/*    }*/}
              {/*  >*/}
              {/*    <div*/}
              {/*      className={"bg-gradient-to-r from-transparent to-white w-8"}*/}
              {/*    />*/}
              {/*    ……*/}
              {/*  </div>*/}
              {/*)}*/}
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
