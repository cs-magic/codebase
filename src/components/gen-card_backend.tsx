"use client"

import { useState } from "react"
import { ActionType } from "../schema/card"

import { GenCardActionButton } from "./gen-card-action-button"
import { GenCardInputUrls } from "./gen-card-input-urls"
import { GenCardInputUser } from "./gen-card-input-user"
import { StandardCard } from "./standard-card"

export const GenCardViaBackend = () => {
  const [ossUrl, setOssUrl] = useState("")

  const action = async (type: ActionType) => {
    console.log("action")
  }

  return (
    <>
      <GenCardInputUrls />

      <GenCardInputUser />

      <GenCardActionButton
        className={"w-full"}
        action={action}
        type={"generate"}
      />
    </>
  )
}
