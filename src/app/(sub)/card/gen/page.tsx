"use client"

import { useRef } from "react"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Card } from "../../../../components/card"
import { Controls } from "../../../../components/card-gen-controls"

export default function GenCardPage() {
  const refCard = useRef<HTMLDivElement>(null)

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto w-full sm:max-w-[720px] mx-auto"}
    >
      <Controls obj={refCard} />

      <Card ref={refCard} />
    </FlexContainer>
  )
}
