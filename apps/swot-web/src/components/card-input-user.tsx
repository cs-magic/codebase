"use client"

import { cardUserAvatarRenderedAtom } from "../store/card.rendered.atom"
import { cardUserAvatarAtom, cardUserNameAtom } from "@/store/card.user.atom"
import { useAtom } from "jotai"
import React from "react"
import { Input } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"

export const CardInputUser = () => {
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)
  const [, setCardUserAvatarRendered] = useAtom(cardUserAvatarRenderedAtom)

  return (
    <>
      <LabelLine title={"user.name"}>
        <Input
          id={"card-user-name"}
          value={cardUserName}
          onChange={(event) => {
            setCardUserName(event.currentTarget.value)
          }}
        />
      </LabelLine>

      <LabelLine title={"user.avatar"}>
        <Input
          id={"card-user-avatar"}
          value={cardUserAvatar}
          onChange={(event) => {
            setCardUserAvatarRendered(false)
            setCardUserAvatar(event.currentTarget.value)
          }}
        />
      </LabelLine>
    </>
  )
}
