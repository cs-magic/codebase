"use client"

import { useAtom } from "jotai"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { cardInputAtom } from "../store/card.atom"

export const GenCardViaBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInputAtom)

  return (
    <>
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
