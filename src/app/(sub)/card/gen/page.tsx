"use client"

import { useState } from "react"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../../packages/common-ui/shadcn/shadcn-components/button"
import { Input } from "../../../../../packages/common-ui/shadcn/shadcn-components/input"
import { Card } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"

export default function GenCardPage() {
  const [v, setV] = useState("")
  const user = useUserSummary()

  return (
    <FlexContainer orientation={"vertical"}>
      <Input
        value={v}
        onChange={(event) => {
          setV(event.currentTarget.value)
        }}
      />

      <Button>Generate</Button>

      {user && (
        <Card
          card={{
            user,
            updatedAt: new Date(),
            content: "hello",
            backgroundImage: undefined,
          }}
        />
      )}
    </FlexContainer>
  )
}
