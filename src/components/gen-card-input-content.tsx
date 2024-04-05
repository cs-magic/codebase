"use client"

import { useAtom } from "jotai"
import React from "react"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Textarea } from "../../packages/common-ui/components/textarea-auto"
import { cardAtom } from "../store/card.atom"
import { StandardCard } from "./standard-card"

export const GenCardInputContent = () => {
  const [card, setCard] = useAtom(cardAtom)

  return (
    <StandardCard title={"Input Content"}>
      <LabelLine title={"content"}>
        <Textarea
          value={card?.contentSummary ?? ""}
          setValue={(v) => {
            setCard((card) => {
              card.contentSummary = v
            })
          }}
        />
      </LabelLine>
    </StandardCard>
  )
}
