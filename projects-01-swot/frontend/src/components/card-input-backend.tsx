import { cardInnerInputAtom } from "@/store/card.atom"
import { useAtom } from "jotai"
import React from "react"
import { Textarea } from "@cs-magic/common/deps/ui/components/textarea-auto"
import { CardInputUser } from "./card-input-user"

export const CardInputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInnerInputAtom)

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
