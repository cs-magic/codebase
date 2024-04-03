import { useAtom } from "jotai"
import { EyeIcon, HeartIcon, MessageSquareTextIcon } from "lucide-react"
import Image from "next/image"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"
import { StatItem } from "../../packages/common-ui/components/stat-item"
import MarkMap from "../../packages/common-visualization/markmap"
import { ICardStat, IMedia } from "../schema/card"
import { cardAtom } from "../store/card.atom"
import { ArticleAuthor } from "./card-view-content-author"

export const CardContent = () => {
  const [body] = useAtom(cardAtom)

  return (
    <div className={"overflow-hidden rounded-lg bg-white text-black relative"}>
      <div className={"grow overflow-hidden flex flex-col"}>
        <Cover cover={body?.cover} />

        <div className={"p-2 flex flex-col gap-2"}>
          <h1 className={"text-lg font-bold shrink-0"}>
            {body?.title}
            {/*{body.summary.title}*/}
          </h1>

          {/*{body?.title && (*/}
          {/*  <span className={"text-xs text-muted-foreground truncate shrink-0"}>*/}
          {/*    原标题：{body.title}*/}
          {/*  </span>*/}
          {/*)}*/}

          <Tags tags={body?.summary?.tags} />

          <Stat stat={body?.stat} />

          <div className={"bg-slate-100 p-2 rounded-lg text-sm"}>
            <div>{body?.summary.description}</div>
          </div>

          <MarkMap content={body?.summary.mindmap} />

          {/*{body?.summary?.comment && <div>AI 评论：{body.summary.comment}</div>}*/}

          <div className={"grow"} />

          {body && <ArticleAuthor card={body} />}

          {/*<MarkdownComp>{content ?? "No Content Yet"}</MarkdownComp>*/}
        </div>
      </div>
    </div>
  )
}

const Cover = ({ cover }: { cover?: IMedia }) => {
  if (!cover) return null
  return (
    <div id={"card-media"} className={"w-full shrink-0"}>
      <AspectRatio ratio={cover?.ratio ?? 2.35}>
        <Image src={cover.url} alt={""} fill className={"object-cover"} />
      </AspectRatio>
    </div>
  )
}

const Stat = ({ stat }: { stat: ICardStat | null | undefined }) => {
  if (!stat) return null
  return (
    <div className={"flex items-center gap-2"}>
      <StatItem Icon={EyeIcon} value={stat.reads} />
      <StatItem Icon={HeartIcon} value={stat.likes} />
      <StatItem Icon={MessageSquareTextIcon} value={stat.comments} />
    </div>
  )
}

const Tags = ({ tags }: { tags: string[] | null | undefined }) => {
  if (!tags?.length) return null

  return (
    <div className={"flex items-center"}>
      {tags.map((tag) => (
        <Badge className={"text-nowrap bg-transparent"} key={tag}>
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
