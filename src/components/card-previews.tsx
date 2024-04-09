"use client"

import React from "react"
import { useSearchParam } from "../../packages/common-hooks/use-search-param"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSelector } from "../../packages/common-ui/components/atom-switcher"
import { GenCardRenderType } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { cardPreviewEngineAtom } from "../store/card.atom"
import { GenCardPreview } from "./gen-card-preview"
import { StandardCard } from "./standard-card"

export const CardPreviews = ({ cards }: { cards: ICardDetail[] }) => {
  const renderType =
    useSearchParam<GenCardRenderType>("renderType") ?? "frontend"

  return (
    <StandardCard title={"Preview"} id={"card-previews"}>
      <AtomSelector
        atom={cardPreviewEngineAtom}
        name={"preview-engine"}
        vs={["html2image", "html2canvas", "modern-screenshot"]}
      />

      <Separator orientation={"horizontal"} />

      <div
        className={
          "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 "
        }
      >
        {cards.map((card, index) => (
          <GenCardPreview key={index} renderType={renderType} card={card} />
        ))}
      </div>
    </StandardCard>
  )
}
