"use client"

import { useAtom } from "jotai"
import React from "react"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { cardUserAvatarAtom, cardUserNameAtom } from "../store/card.atom"

export const GenCardInputUser = () => {
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)

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
            setCardUserAvatar(event.currentTarget.value)
          }}
        />
      </LabelLine>
    </>
  )
}
