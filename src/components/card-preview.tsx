"use client"

import { useAtom, useAtomValue } from "jotai"
import { useRef } from "react"
import { Action2Type, GenCardRenderType } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { cardRenderedAtom, cardUserAtom } from "../store/card.atom"
import { CardAction2 } from "./card-action2"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"
import { CardHeader } from "./card-header"

export const CardPreview = ({
  renderType,
  card,
  withActions,
}: {
  renderType?: GenCardRenderType
  card?: ICardDetail | null
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
    <div className={"w-full max-w-[375px] flex flex-col gap-2"}>
      {withActions && (
        <div className={"flex gap-2"}>
          <Action type={"copy"} />
          <Action type={"download"} />
          {renderType === "backend" && <Action type={"upload"} />}
        </div>
      )}

      <div
        ref={obj}
        id={"card-preview"}
        className={"w-full font-card corner-gradient"}
      >
        <CardHeader user={card?.user ?? user} />

        <CardContent card={card} />

        <CardFooter card={card} />
      </div>
    </div>
  )
}
