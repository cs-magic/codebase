"use client"

import { useAtom } from "jotai"
import { useRef } from "react"
import { ActionType } from "../schema/card"
import { cardRenderedAtom } from "../store/card.atom"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"
import { CardHeader } from "./card-header"
import { GenCardPreviewAction } from "./gen-card-preview-action"
import { StandardCard } from "./standard-card"

export const GenCardPreview = () => {
  const obj = useRef<HTMLDivElement>(null)
  const [rendered] = useAtom(cardRenderedAtom)

  console.log("-- preview: ", { rendered })

  const Action = ({ type }: { type: ActionType }) => (
    <GenCardPreviewAction type={type} obj={obj} rendered={rendered} />
  )

  return (
    <StandardCard title={"Preview"}>
      <div className={"flex justify-around gap-2"}>
        <Action type={"copy"} />
        <Action type={"download"} />
        <Action type={"upload"} />
      </div>

      <div
        ref={obj}
        id={"card-preview"}
        className={"w-full font-card corner-gradient"}
      >
        <CardHeader />

        <CardContent />

        <CardFooter />
      </div>
    </StandardCard>
  )
}
