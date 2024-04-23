import { useAtom } from "jotai"
import React from "react"
import { Textarea } from "../../../../packages/ui/components/textarea-auto"
import { cardInnerInputAtom } from "@/store/card.atom"
import { CardInputUser } from "./card-input-user"

export const CardInputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInnerInputAtom)
  // const [cardTitle] = useAtom(cardAtom)

  return (
    <>
      <CardInputUser />

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
