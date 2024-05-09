"use client"

import { cardPreviewEngineAtom } from "@/store/card.rendered.atom"
import { useAtomValue } from "jotai"
import React from "react"
import {
  cardPreviewEngineTypeSchema,
  type GenCardApproach,
} from "@cs-magic/wechat/schema/card"
import { useSearchParam } from "../../../../packages-to-classify/hooks/use-search-param"
import { Input } from "../../../../packages-to-classify/ui-shadcn/components/input"
import { Separator } from "../../../../packages-to-classify/ui-shadcn/components/separator"
import { cn } from "../../../../packages-to-classify/ui-shadcn/utils"
import { AtomSelector } from "../../../../packages-to-classify/ui/components/atom-switcher"
import { cardPreviewAtom } from "../store/card.atom"
import { CardInputBackend } from "./card-input-backend"
import { CardInputFrontend } from "./card-input-frontend"
import { CardPreviewContainer } from "./card-preview-container"
import { StandardCard } from "./standard-card"

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
