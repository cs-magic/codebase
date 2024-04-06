"use client"

import { useAtom } from "jotai"
import { useRef } from "react"
import { AtomSelector } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Action2Type } from "../schema/card"
import {
  cardFetchEngineAtom,
  cardPreviewEngineAtom,
  cardRenderedAtom,
} from "../store/card.atom"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"
import { CardHeader } from "./card-header"
import { GenCardAction2 } from "./gen-card-action-2"
import { StandardCard } from "./standard-card"

export const GenCardPreview = () => {
  const obj = useRef<HTMLDivElement>(null)
  const [rendered] = useAtom(cardRenderedAtom)

  console.log("-- preview: ", { rendered })

  const Action = ({ type }: { type: Action2Type }) => (
    <GenCardAction2 type={type} obj={obj} rendered={rendered} />
  )

  return (
    <StandardCard title={"Preview"}>
      <AtomSelector
        atom={cardPreviewEngineAtom}
        name={"preview-engine"}
        vs={["html2image", "html2canvas"]}
      />

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
