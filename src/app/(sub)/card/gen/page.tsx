"use client"

import { useRef } from "react"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Card } from "../../../../components/card"
import { Controls } from "../../../../components/card-gen-controls"
import { InputLine } from "../../../../components/card-gen-input-line"

export default function GenCardPage() {
  const refCard = useRef<HTMLDivElement>(null)

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      <InputLine />

      <Controls obj={refCard} />

      <Card ref={refCard} />
    </FlexContainer>
  )
}
