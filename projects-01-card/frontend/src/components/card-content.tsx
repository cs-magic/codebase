"use client"

import { cn } from "../../../../packages-to-classify/ui-shadcn/utils"
import MarkMap from "../../../../packages-to-classify/visualization/markmap"
import { ICardInnerPreview } from "../schema/card"
import { CardContentAuthor } from "./card-content-author"
import { Cover } from "./card-content-cover"
import { Tags } from "./card-content-tags"

export const CardContent = ({
  innerPreview,
}: {
  innerPreview?: ICardInnerPreview | null
}) => {
  // console.log("-- summary: ", summary)

  return (
    <div
      className={"relative m-2 overflow-hidden rounded-lg bg-white text-black"}
    >
      <div className={"flex grow flex-col overflow-hidden"}>
        <Cover cover={innerPreview?.cover} />

        <div className={"flex flex-col gap-2 p-2"}>
          <h1 className={"shrink-0 text-lg font-bold"}>
            {innerPreview?.title}
          </h1>

          <Tags tags={innerPreview?.summary?.parsed.tags} />

          {/*<Stat stat={content?.stat} />*/}

          <div className={"rounded-lg bg-slate-100 p-2 text-sm"}>
            {innerPreview?.summary?.parsed.description}
          </div>

          <MarkMap content={innerPreview?.summary?.parsed.mindmap} />

          <CardContentAuthor render={innerPreview} />

          <div className={"mt-2 text-center text-xs text-muted-foreground/25"}>
            该内容由
            <span
              className={cn(
                // "underline",
                " mx-1",
              )}
            >
              {innerPreview?.summary?.model?.toUpperCase()} 大模型
              {/*大模型*/}
            </span>
            生成
          </div>
        </div>
      </div>
    </div>
  )
}
