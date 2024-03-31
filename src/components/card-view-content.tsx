import { first } from "lodash"
import { useRef } from "react"
import { useMeasure } from "react-use"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"
import MarkMap from "../../packages/common-visualization/markmap"
import { useAutoCardContent } from "../hooks/use-card-content"
import { CardType, ICard, IMedia } from "../schema/card"
import { AuthorLine } from "./card-view-content-author"
import { CardMedia } from "./card-view-content-media"

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
          {body?.summary?.title && (
            <h1 className={"text-xl font-medium truncate shrink-0"}>
              {body.summary.title}
            </h1>
          )}

          {/*{body?.title && (*/}
          {/*  <span className={"text-xs text-muted-foreground truncate shrink-0"}>*/}
          {/*    原标题：{body.title}*/}
          {/*  </span>*/}
          {/*)}*/}

          {body?.summary?.description && (
            <div className={"bg-slate-100 p-2 rounded-lg"}>
              <div>AI 摘要：{body.summary.description}</div>
              {body.summary.tags?.length && (
                <div className={"flex items-center"}>
                  {body.summary.tags.map((tag) => (
                    <Badge className={"text-nowrap bg-transparent"} key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {body?.summary?.mindmap && <MarkMap content={body.summary.mindmap} />}

          {/*{body?.summary?.comment && <div>AI 评论：{body.summary.comment}</div>}*/}

          <div className={"grow"} />

          {body && <AuthorLine body={body} />}

          {/*<MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>*/}
        </div>
      </div>
    </div>
  )
}
