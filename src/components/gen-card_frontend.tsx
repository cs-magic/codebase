"use client"

import { useAtom, useAtomValue } from "jotai"
import React from "react"
import { supportedBackendEngineTypes } from "../../packages/common-common/schema"
import { useSearchParam } from "../../packages/common-hooks/use-search-param"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { cn } from "../../packages/common-ui-shadcn/utils"
import {
  AtomSelector,
  AtomSwitcher,
} from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { GenCardRenderType } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import {
  cardAtom,
  cardAuthorWithTitleAtom,
  cardFetchEngineAtom,
  cardInputAtom,
  cardLLMEnabledAtom,
  cardLLMTypeAtom,
  cardMdWithImgAtom,
  cardPreviewEngineAtom,
  cardRefetchCardAtom,
  cardRefetchCommentsAtom,
  cardRefetchPageAtom,
} from "../store/card.atom"
import { GenCardAction1 } from "./gen-card-action-1"
import { GenCardInputUrl } from "./gen-card-input-url"
import { GenCardInputUser } from "./gen-card-input-user"
import { GenCardPreview } from "./gen-card-preview"
import { StandardCard } from "./standard-card"

export const GenCard = () => {
  const card = useAtomValue(cardAtom)
  const renderType =
    useSearchParam<GenCardRenderType>("renderType") ?? "frontend"

  const Input = renderType === "backend" ? InputBackend : InputFrontend

  return (
    <div
      className={cn(
        "w-full h-full mx-auto gap-4 p-2 sm:p-4 flex flex-wrap overflow-auto",
      )}
    >
      <div className={"grow overflow-auto h-full p-2 -mx-2"}>
        <StandardCard title={"Input Control"}>
          <Input />
        </StandardCard>
      </div>

      <GenCardPreviews cards={card ? [card] : []} />
    </div>
  )
}

export const GenCardPreviews = ({ cards }: { cards: ICardDetail[] }) => {
  const renderType =
    useSearchParam<GenCardRenderType>("renderType") ?? "frontend"

  return (
    <StandardCard title={"Preview"} className={"grow overflow-auto"}>
      <AtomSelector
        atom={cardPreviewEngineAtom}
        name={"preview-engine"}
        vs={["html2image", "html2canvas", "modern-screenshot"]}
      />

      <Separator orientation={"horizontal"} />

      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"}>
        {cards.map((card, index) => (
          <GenCardPreview key={index} renderType={renderType} card={card} />
        ))}
      </div>
    </StandardCard>
  )
}

const InputFrontend = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )
  return (
    <>
      <GenCardInputUrl />

      <GenCardInputUser />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardRefetchPageAtom} name={"refetch-page"} />

      <AtomSwitcher atom={cardLLMEnabledAtom} name={"llm-enabled"} />

      <AtomSelector
        atom={cardLLMTypeAtom}
        name={"llm-type"}
        vs={[
          "gpt-3.5-turbo",
          "gpt-4",
          "glm-4",
          "moonshot-v1-8k",
          "moonshot-v1-32k",
          "moonshot-v1-128k",
        ]}
      />

      <AtomSwitcher atom={cardRefetchCardAtom} name={"refetch-stat"} />

      <AtomSwitcher atom={cardRefetchCommentsAtom} name={"refetch-comments"} />

      <Separator orientation={"horizontal"} />

      <AtomSelector
        atom={cardFetchEngineAtom}
        name={"fetch engine"}
        vs={supportedBackendEngineTypes}
      />

      <AtomSwitcher atom={cardMdWithImgAtom} name={"md-with-img"} />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardAuthorWithTitleAtom} name={"author.with-title"} />

      <LabelLine title={"map.vertical.space"}>
        <Input
          type={"number"}
          value={mapSpacingVertical ?? 0}
          onChange={(event) => {
            setMapSpacingVertical(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>

      <Separator orientation={"horizontal"} />

      <div className={"flex items-center gap-2"}>
        <GenCardAction1 type={"generate"} />
        <GenCardAction1 type={"reset"} />
      </div>
    </>
  )
}

const InputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInputAtom)

  return (
    <>
      <GenCardInputUser />

      <Textarea
        id={"card-content"}
        minRows={10}
        maxRows={20}
        value={cardInput}
        onChange={(event) => {
          setCardInput(event.currentTarget.value)
        }}
      />
    </>
  )
}
