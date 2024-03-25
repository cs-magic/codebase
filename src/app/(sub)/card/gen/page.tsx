"use client"

import { useState } from "react"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../../packages/common-ui/shadcn/shadcn-components/button"
import { Input } from "../../../../../packages/common-ui/shadcn/shadcn-components/input"

export default function GenCardPage() {
  const [v, setV] = useState("")

  return (
    <FlexContainer>
      <Input
        value={v}
        onChange={(event) => {
          setV(event.currentTarget.value)
        }}
      />

      <Button>Generate</Button>
    </FlexContainer>
  )
}
