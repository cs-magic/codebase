"use client"

import { useAtomValue } from "jotai"
import React from "react"

import { cn } from "@cs-magic/common"
import { useSearchParam } from "@cs-magic/next-hooks"
import { AtomSelector, Separator, StandardCard } from "@cs-magic/react-ui"
import {
  cardPreviewEngineTypeSchema,
  GenCardApproach,
} from "@cs-magic/swot-backend/schema"
import { CardInputBackend } from "@cs-magic/swot-frontend/components/card-input-backend"
import { CardInputFrontend } from "@cs-magic/swot-frontend/components/card-input-frontend"
import { cardPreviewAtom } from "@cs-magic/swot-frontend/store/card.atom"
import { cardPreviewEngineAtom } from "@cs-magic/swot-frontend/store/card.rendered.atom"

import { CardPreviewContainer } from "@/components/card-preview-container"

export const Card = () => {
  const preview = useAtomValue(cardPreviewAtom)
  const renderType = useSearchParam<GenCardApproach>("renderType") ?? "frontend"

  const Input = renderType === "backend" ? CardInputBackend : CardInputFrontend
  // const Input = CardInputFrontend

  console.log({ preview })

  return (
    <div
      className={cn(
        "mx-auto grid h-full w-full grid-cols-1 gap-4 overflow-auto p-2 sm:grid-cols-2 sm:p-4",
      )}
    >
      <StandardCard title={"Input Control"}>{<Input />}</StandardCard>

      <StandardCard title={"Preview"} id={"card-previews"}>
        <AtomSelector
          atom={cardPreviewEngineAtom}
          name={"preview-engine"}
          vs={cardPreviewEngineTypeSchema.options}
        />

        <Separator orientation={"horizontal"} />

        <CardPreviewContainer
          genCardApproach={renderType}
          preview={preview}
          withActions
        />
      </StandardCard>
    </div>
  )
}

export default Card
