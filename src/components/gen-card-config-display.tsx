"use client"

import { Card } from "@prisma/client"
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

export const GenCardConfigDisplay = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )

  return (
    <StandardCard title={"Display Control"}>
      <GenCardInputUser />

      <Separator orientation={"horizontal"} />

      <ConfigLine field={"author"} />
      <ConfigLine field={"title"} />
      <ConfigLine field={"description"} />
      <ConfigLine field={"contentSummary"} compType={"textarea"} />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardAuthorWithTitleAtom} name={"author with title"} />
      <LabelLine title={"map vertical space"}>
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

const ConfigLine = ({
  field,
  compType = "input",
}: {
  field: keyof Card
  compType?: "input" | "textarea"
}) => {
  const [card, setCard] = useAtom(cardAtom)

  const Comp = compType === "input" ? Input : Textarea

  return (
    <LabelLine title={field}>
      <Comp
        value={card[field] ?? ""}
        onChange={(event) => {
          setCard((card) => {
            card[field] = event.currentTarget.value
          })
        }}
      />
    </LabelLine>
  )
}
