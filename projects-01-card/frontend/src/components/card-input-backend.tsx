import {
  cardAuthorAvatarRenderedAtom,
  cardUserAvatarRenderedAtom,
} from "@/store/card.rendered.atom"
import { useAtom } from "jotai"
import React from "react"
import { Textarea } from "../../../../packages-to-classify/ui/components/textarea-auto"
import { cardInnerInputAtom } from "@/store/card.atom"
import { CardInputUser } from "./card-input-user"

export const CardInputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInnerInputAtom)
  const [, setCardAuthorAvatarRendered] = useAtom(cardAuthorAvatarRenderedAtom)
  const [, setCardUserAvatarRendered] = useAtom(cardUserAvatarRenderedAtom)

  return (
    <>
      <CardInputUser />

      <Textarea
        id={"card-content"}
        minRows={10}
        maxRows={20}
        value={cardInput}
        onChange={(event) => {
          // setCardAuthorAvatarRendered(false)
          // setCardUserAvatarRendered(false)
          setCardInput(event.currentTarget.value)
        }}
      />
    </>
  )
}
