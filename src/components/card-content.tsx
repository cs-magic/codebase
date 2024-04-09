"use client"

import { parseSummary } from "../../packages/common-article/parse-summary"
import MarkMap from "../../packages/common-visualization/markmap"
import { ICardDetail } from "../schema/card.basic"
import { CardContentAuthor } from "./card-content-author"
import { Cover } from "./card-content-cover"
import { Stat } from "./card-content-stat"
import { Tags } from "./card-content-tags"

export const CardContent = ({ card }: { card?: ICardDetail | null }) => {
  const summary = parseSummary(card?.contentSummary)

  console.log("-- summary: ", summary)

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
        </div>
      </div>
    </div>
  )
}
