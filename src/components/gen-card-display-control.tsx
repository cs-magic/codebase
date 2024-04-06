"use client"

import { useAtom } from "jotai"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { cardAtom, cardAuthorWithTitleAtom } from "../store/card.atom"
import { GenCardInputUser } from "./gen-card-input-user"
import { StandardCard } from "./standard-card"

export const GenCardDisplayControl = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )
  const [card, setCard] = useAtom(cardAtom)

  return (
    <StandardCard title={"Display Control"}>
      <GenCardInputUser />

      <Separator orientation={"horizontal"} />

      <LabelLine title={"card.content"}>
        <Textarea
          id={"card-content"}
          value={
            typeof card.contentSummary === "object"
              ? JSON.stringify(card.contentSummary)
              : card.contentSummary
          }
          onChange={(event) => {
            setCard((card) => {
              card.contentSummary = event.currentTarget.value
            })
          }}
        />
      </LabelLine>

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
