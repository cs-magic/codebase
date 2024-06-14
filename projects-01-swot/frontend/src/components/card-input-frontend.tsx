import {
  cardLlmModelTypeAtom,
  cardLlmEnabledAtom,
  cardSummaryWithImageAtom,
} from "@/store/card.summary.atom"
import {
  cardFetchEngineAtom,
  cardFetchWithCacheAtom,
  cardFetchStatEnabledAtom,
  cardFetchCommentsEnabledAtom,
  cardWatermarkTextAtom,
} from "@/store/card.request.atom"
import { useAtom } from "jotai"
import React from "react"
import { backendTypeSchema } from "@cs-magic/llm/schema/llm.base"
import { llmModelTypeSchema } from "@cs-magic/llm/schema/llm.models"
import { Input } from "@cs-magic/common/deps/ui-shadcn/components/input"
import { Separator } from "@cs-magic/common/deps/ui-shadcn/components/separator"
import {
  AtomSelector,
  AtomSwitcher,
} from "@cs-magic/common/deps/ui/components/atom-switcher"
import { LabelLine } from "@cs-magic/common/deps/ui/components/label-line"
import { mapSpacingVerticalAtom } from "@cs-magic/common/deps/visualization/store"
import { cardAuthorWithTitleAtom } from "../store/card.atom"
import { CardAction1 } from "./card-action1"
import { CardInputUrl } from "./card-input-url"
import { CardInputUser } from "./card-input-user"

export const CardInputFrontend = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )
  const [cardWatermarkText, setCardWatermarkText] = useAtom(
    cardWatermarkTextAtom,
  )

  return (
    <>
      <CardInputUrl />

      <CardInputUser />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardFetchWithCacheAtom} name={"fetch-with-cache"} />

      <AtomSwitcher atom={cardLlmEnabledAtom} name={"llm-enabled"} />

      <AtomSelector
        atom={cardLlmModelTypeAtom}
        name={"llm-type"}
        vs={llmModelTypeSchema.options}
      />

      <AtomSwitcher atom={cardFetchStatEnabledAtom} name={"refetch-stat"} />

      <AtomSwitcher
        atom={cardFetchCommentsEnabledAtom}
        name={"refetch-comments"}
      />

      <Separator orientation={"horizontal"} />

      <AtomSelector
        atom={cardFetchEngineAtom}
        name={"fetch engine"}
        vs={backendTypeSchema.options}
      />

      <AtomSwitcher atom={cardSummaryWithImageAtom} name={"md-with-img"} />

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

      <LabelLine title={"watermark.text"}>
        <Input
          value={cardWatermarkText}
          onChange={(event) => {
            setCardWatermarkText(event.currentTarget.value)
          }}
        />
      </LabelLine>

      <Separator orientation={"horizontal"} />

      <div className={"flex items-center gap-2"}>
        <CardAction1 type={"generate"} />
        <CardAction1 type={"reset"} />
      </div>
    </>
  )
}
