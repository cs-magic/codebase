"use client"

import { useAtom } from "jotai"
import MarkMap from "../../packages/common-visualization/markmap"
import { cardAtom } from "../store/card.atom"
import { Cover } from "./card-content-cover"
import { Stat } from "./card-content-stat"
import { Tags } from "./card-content-tags"
import { ArticleAuthor } from "./card-content-author"

export const CardContent = () => {
  const [card] = useAtom(cardAtom)

  return (
    <div className={"overflow-hidden rounded-lg bg-white text-black relative"}>
      <div className={"grow overflow-hidden flex flex-col"}>
        <Cover cover={card?.cover} />

        <div className={"p-2 flex flex-col gap-2"}>
          <h1 className={"text-lg font-bold shrink-0"}>{card?.title}</h1>

          <Tags tags={card?.summary?.tags} />

          <Stat stat={card?.stat} />

          <div className={"bg-slate-100 p-2 rounded-lg text-sm"}>
            {card?.summary?.description}
          </div>

          <MarkMap content={card?.summary?.mindmap} />

          <ArticleAuthor card={card} />
        </div>
      </div>
    </div>
  )
}
