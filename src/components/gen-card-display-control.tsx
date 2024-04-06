"use client"

import { useAtom } from "jotai"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { cardAuthorWithTitleAtom, cardInputAtom } from "../store/card.atom"
import { GenCardInputUser } from "./gen-card-input-user"
import { StandardCard } from "./standard-card"

export const GenCardDisplayControl = () => {
  const [cardInput, setCardInput] = useAtom(cardInputAtom)

  return (
    <StandardCard title={"Display Control"}>
      <Textarea
        id={"card-content"}
        value={cardInput}
        onChange={(event) => {
          setCardInput(event.currentTarget.value)
        }}
      />
    </StandardCard>
  )
}
