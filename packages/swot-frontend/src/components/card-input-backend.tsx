import { TextareaAuto } from "@cs-magic/react-ui"
import { useAtom } from "jotai"
import React from "react"
import { cardInnerInputAtom } from "../store/card.atom"
import { CardInputUser } from "./card-input-user"

export const CardInputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInnerInputAtom)

  return (
    <>
      <CardInputUser />

      <TextareaAuto
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
