"use client"

import { useAtom } from "jotai"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { cardInputAtom } from "../store/card.atom"
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
