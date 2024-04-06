"use client"

import { useAtom } from "jotai"
import { useEffect } from "react"
import { parseJS } from "../../packages/common-general/safe-parse-json"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { ICardDetail } from "../schema/card.basic"
import {
  cardAtom,
  cardAuthorWithTitleAtom,
  cardInputAtom,
} from "../store/card.atom"
import { StandardCard } from "./standard-card"

export const GenCardDisplayControl = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )
  const [card, setCard] = useAtom(cardAtom)
  const [cardInput, setCardInput] = useAtom(cardInputAtom)
  useEffect(() => {
    setCardInput(JSON.stringify(card))
  }, [card])

  return (
    <StandardCard title={"Display Control"}>
      <Textarea
        id={"card-content"}
        value={cardInput}
        onChange={(event) => {
          const v = event.currentTarget.value
          setCardInput(v)

          const card = parseJS<ICardDetail>(v)
          if (card) setCard(card)
        }}
      />

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
    </StandardCard>
  )
}
