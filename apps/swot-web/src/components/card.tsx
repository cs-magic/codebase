"use client"

import { useSearchParam } from "@cs-magic/common/hooks/use-search-param"
import { AtomSelector } from "@cs-magic/common/ui/components/atom-switcher"
import { Separator } from "@cs-magic/common/ui/components/shadcn/ui/separator"
import { StandardCard } from "@cs-magic/common/ui/components/standard-card"
import { cn } from "@cs-magic/common/ui/utils"
import {
  cardPreviewEngineTypeSchema,
  GenCardApproach,
} from "@cs-magic/swot-core/schema/card"
import { cardPreviewAtom } from "../store/card.atom"
import { cardPreviewEngineAtom } from "../store/card.rendered.atom"
import { useAtomValue } from "jotai"
import React from "react"
import { CardInputBackend } from "./card-input-backend"
import { CardInputFrontend } from "./card-input-frontend"
import { CardPreviewContainer } from "./card-preview-container"

export const Card = () => {
  const preview = useAtomValue(cardPreviewAtom)
  const renderType = useSearchParam<GenCardApproach>("renderType") ?? "frontend"

  const Input = renderType === "backend" ? CardInputBackend : CardInputFrontend

  console.log({ preview })

  return (
    <div
      className={cn(
        "mx-auto grid h-full w-full grid-cols-1 gap-4 overflow-auto p-2 sm:grid-cols-2 sm:p-4",
      )}
    >
      <StandardCard title={"Input Control"}>
        <Input />
      </StandardCard>

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
