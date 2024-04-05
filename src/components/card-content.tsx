"use client"

import { useAtom } from "jotai"
import { parseSummary } from "../../packages/common-article/utils"
import MarkMap from "../../packages/common-visualization/markmap"
import { cardAtom } from "../store/card.atom"
import { Cover } from "./card-content-cover"
import { Stat } from "./card-content-stat"
import { Tags } from "./card-content-tags"
import { ArticleAuthor } from "./card-content-author"

export const CardContent = () => {
  const [card] = useAtom(cardAtom)

  const summary = parseSummary(card.contentSummary)

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

          <ArticleAuthor card={card} />
        </div>
      </div>
    </div>
  )
}
