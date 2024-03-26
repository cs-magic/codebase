import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { BilibiliVideo } from "../../packages/common-bilibili/component"
import { MarkdownComp } from "../../packages/common-markdown/component"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { IUserSummary } from "../schema/user.summary"
import { UserAvatar } from "./user-avatar"
import { CardType } from "@/app/(sub)/card/gen/store"

export type ICard = {
  type: CardType

  user?: IUserSummary
  updatedAt: Date

  resourceUrl?: string
  content?: string
  sourceUrl?: string | null
  coverRatio?: number
}

export const Card = forwardRef<
  HTMLDivElement,
  { card: ICard } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  const [content, setContent] = useState("")
  useEffect(() => {
    if (!card.content) return

    setContent(card.content)
  }, [card.content])

  const refText = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!refText.current) return

    const { scrollHeight, clientHeight } = refText.current
    const overflow = scrollHeight > clientHeight
    // console.log({ content, scrollHeight, clientHeight, overflow })
    if (!overflow) return

    setContent(
      (content) => content?.slice(0, Math.min(content?.length - 5, 100)) + "…",
    )
  }, [content])

  console.log("-- card: ", card)

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
        <div className={"w-full h-full overflow-hidden flex flex-col"}>
          <h1 className={"text-black font-medium my-2 shrink-0"}>Area #1</h1>

          <div
            className={
              "w-full grow overflow-hidden rounded-lg flex flex-col bg-white text-black gap-2"
            }
          >
            <div className={"w-full shrink-0"}>
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

                {card.type === "text-iframe" && card.resourceUrl && (
                  // todo: more iframe
                  <BilibiliVideo
                    video={{ url: card.resourceUrl, height: 240 }}
                  />
                )}

                {card.type === "text-video" && card.resourceUrl && (
                  <ReactPlayer
                    playing
                    url={card.resourceUrl}
                    style={{ width: "100%", border: "1px solid black" }}
                  />
                )}
              </AspectRatio>
            </div>

            <div className={"px-2 grow overflow-hidden relative flex flex-col"}>
              <div ref={refText} className={"grow overflow-hidden"}>
                <MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>
              </div>

              {card.sourceUrl && (
                <QRCodeSVG
                  value={card.sourceUrl}
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
