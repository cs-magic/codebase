"use client"

import Image from "next/image"
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
    <div className={"grid grid-cols-2 p-4"}>
      <div className={"w-full"}>
        <GenCardInputUrls />

        <GenCardInputUser />

        <StandardCard title={"Actions"} type={"beauty"}>
          <div className={"flex gap-2"}>
            <GenCardActionButton action={action} type={"generate"} />
          </div>
        </StandardCard>
      </div>

      <div className={"border flex justify-center"}>
        {ossUrl && (
          <div className={"w-full max-w-[365px]"}>
            <Image src={ossUrl} alt={"oss url"} className={"w-full h-auto"} />
          </div>
        )}
      </div>
    </div>
  )
}
