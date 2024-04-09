"use client"

import React from "react"
import { useSearchParam } from "../../packages/common-hooks/use-search-param"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSelector } from "../../packages/common-ui/components/atom-switcher"
import { GenCardRenderType } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { cardPreviewEngineAtom } from "../store/card.atom"
import { CardPreview } from "./card-preview"
import { StandardCard } from "./standard-card"

export const CardPreviews = ({
  cards,
  withActions,
}: {
  cards: ICardDetail[]
  withActions?: boolean
}) => {
  const renderType =
    useSearchParam<GenCardRenderType>("renderType") ?? "frontend"

  return (
    <StandardCard
      title={"Preview"}
      id={"card-previews"}
      className={"overflow-auto"}
    >
      {withActions && (
        <>
          <AtomSelector
            atom={cardPreviewEngineAtom}
            name={"preview-engine"}
            vs={["html2image", "html2canvas", "modern-screenshot"]}
          />

          <Separator orientation={"horizontal"} />
        </>
      )}

      <div className={"w-full flex flex-wrap gap-2"}>
        {cards.map((card, index) => (
          <CardPreview
            key={index}
            renderType={renderType}
            card={card}
            withActions={withActions}
          />
        ))}
      </div>
    </StandardCard>
  )
}
