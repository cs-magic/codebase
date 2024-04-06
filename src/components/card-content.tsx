"use client"

import { useAtomValue } from "jotai"
import MarkMap from "../../packages/common-visualization/markmap"
import { cardAtom, summaryAtom } from "../store/card.atom"
import { CardContentAuthor } from "./card-content-author"
import { Cover } from "./card-content-cover"
import { Stat } from "./card-content-stat"
import { Tags } from "./card-content-tags"

export const CardContent = () => {
  const card = useAtomValue(cardAtom)
  const summary = useAtomValue(summaryAtom)

  // console.log("-- summary: ", summary)

  return (
    <div
      className={"m-2 overflow-hidden rounded-lg bg-white text-black relative"}
    >
      <div className={"grow overflow-hidden flex flex-col"}>
        <Cover cover={card?.cover} />

        <div className={"p-2 flex flex-col gap-2"}>
          <h1 className={"text-lg font-bold shrink-0"}>{card?.title}</h1>

          <Tags tags={summary?.result?.tags} />

          <Stat stat={card?.stat} />

          <div className={"bg-slate-100 p-2 rounded-lg text-sm"}>
            {summary?.result?.description}
          </div>

          <MarkMap content={summary?.result?.mindmap} />

          <CardContentAuthor card={card} />
        </div>
      </div>
    </div>
  )
}
