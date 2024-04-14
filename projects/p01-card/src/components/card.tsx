"use client"

import { useAtomValue } from "jotai"
import React from "react"
import { useSearchParam } from "../../../common-hooks/use-search-param"
import { Input } from "../../../common-ui-shadcn/components/input"
import { Separator } from "../../../common-ui-shadcn/components/separator"
import { cn } from "../../../common-ui-shadcn/utils"
import { AtomSelector } from "../../../common-ui/components/atom-switcher"
import { GenCardRenderType } from "../schema/card"
import {
  cardAtom,
  cardPreviewEngineAtom,
  cardPreviewEngineTypeSchema,
} from "../store/card.atom"
import { CardInputBackend } from "./card-input-backend"
import { CardInputFrontend } from "./card-input-frontend"
import { CardPreview } from "./card-preview"
import { StandardCard } from "./standard-card"

export const Card = () => {
  const card = useAtomValue(cardAtom)
  const renderType =
    useSearchParam<GenCardRenderType>("renderType") ?? "frontend"

  const Input = renderType === "backend" ? CardInputBackend : CardInputFrontend

  return (
    <div
      className={cn(
        "w-full h-full mx-auto gap-4 p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 overflow-auto",
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

        <CardPreview renderType={renderType} card={card} withActions />
      </StandardCard>
    </div>
  )
}
