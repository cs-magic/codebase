"use client"

import { useState } from "react"
import { ActionType } from "../schema/card"

import { GenCardActionButton } from "./gen-card-action-button"

export const GenCardViaBackend = () => {
  const [ossUrl, setOssUrl] = useState("")

  const action = async (type: ActionType) => {
    console.log("action")
  }

  return (
    <>
      {/*<GenCardInputUrls />*/}

      <GenCardActionButton
        className={"w-full"}
        action={action}
        type={"generate"}
      />
    </>
  )
}
