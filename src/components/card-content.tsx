"use client"

import { parseSummary } from "../../packages/common-llm/parse-summary"
import { cn } from "../../packages/common-ui-shadcn/utils"
import MarkMap from "../../packages/common-visualization/markmap"
import { ICardDetail } from "../schema/card.basic"
import { CardContentAuthor } from "./card-content-author"
import { Cover } from "./card-content-cover"
import { Stat } from "./card-content-stat"
import { Tags } from "./card-content-tags"

export const CardContent = ({ card }: { card?: ICardDetail | null }) => {
  const summary = parseSummary(card?.contentSummary)

  // console.log("-- summary: ", summary)

  return (
    <div
      className={"m-2 overflow-hidden rounded-lg bg-white text-black relative"}
    >
      <div className={"grow overflow-hidden flex flex-col"}>
        <Cover cover={card?.cover} />

        <div className={"p-2 flex flex-col gap-2"}>
          <h1 className={"text-lg font-bold shrink-0"}>{card?.title}</h1>

          <Tags tags={summary?.tags} />

          <Stat stat={card?.stat} />

          <div className={"bg-slate-100 p-2 rounded-lg text-sm"}>
            {summary?.description}
          </div>

          <MarkMap content={summary?.mindmap} />

          <CardContentAuthor card={card} />

          <div className={"text-muted-foreground/25 mt-2 text-xs text-center"}>
            该内容由
            <span
              className={cn(
                // "underline",
                " mx-1",
              )}
            >
              {/*{summary.model?.name?.toUpperCase()}大模型*/}
              大模型
            </span>
            生成，如有偏差请反馈
          </div>
        </div>
      </div>
    </div>
  )
}
