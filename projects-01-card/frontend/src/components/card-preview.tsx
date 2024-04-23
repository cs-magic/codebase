"use client"

import { cardRenderedAtom } from "@/store/card.rendered.atom"
import { useAtom, useAtomValue } from "jotai"
import { useRef } from "react"
import {
  Action2Type,
  GenCardApproach,
  ICardPreview,
} from "../../../../packages-core/common/schema/card"
import { cardUserAtom } from "../store/card.atom"
import { CardAction2 } from "./card-action2"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"
import { CardHeader } from "./card-header"

export const CardPreview = ({
  preview,
  genCardApproach,
  withActions,
}: {
  preview?: ICardPreview | null
  genCardApproach?: GenCardApproach
  withActions?: boolean
}) => {
  const obj = useRef<HTMLDivElement>(null)
  const [rendered] = useAtom(cardRenderedAtom)
  const user = useAtomValue(cardUserAtom)

  // console.log("-- preview: ", { rendered })

  const Action = ({ type }: { type: Action2Type }) => (
    <CardAction2 type={type} obj={obj} rendered={rendered} />
  )

  return (
    <div className={"flex w-full max-w-[375px] flex-col gap-2"}>
      {withActions && (
        <div className={"flex gap-2"}>
          <Action type={"copy"} />
          <Action type={"download"} />
          {genCardApproach === "backend" && <Action type={"upload"} />}
        </div>
      )}

      <div
        ref={obj}
        id={"card-preview"}
        className={"corner-gradient w-full font-card"}
      >
        <CardHeader user={user} />

        <CardContent innerPreview={preview?.inner} />

        <CardFooter outPreview={preview?.outer} />
      </div>
    </div>
  )
}
