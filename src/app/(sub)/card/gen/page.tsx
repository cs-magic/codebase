"use client"

import { useState } from "react"
import { BilibiliDisplayType } from "../../../../../packages/common-bilibili/componnets"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { Button } from "../../../../../packages/common-ui/shadcn/shadcn-components/button"
import { Input } from "../../../../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../../../../packages/common-ui/shadcn/shadcn-components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../packages/common-ui/shadcn/shadcn-components/select"
import { Card, CardType } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"

export default function GenCardPage() {
  const [v, setV] = useState("")
  const user = useUserSummary()
  const [cardType, setCardType] = useState<CardType>("bilibili")
  const [displayType, setDisplayType] = useState<BilibiliDisplayType>("video")

  return (
    <FlexContainer orientation={"vertical"}>
      <Input
        value={v}
        onChange={(event) => {
          setV(event.currentTarget.value)
        }}
      />

      <Button>Generate</Button>

      <div className={"flex items-center gap-2"}>
        <Label className={"shrink-0"}>Display Type</Label>
        <Select
          defaultValue={displayType}
          onValueChange={(v) => setDisplayType(v as BilibiliDisplayType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value={"video"}>Video</SelectItem>
              <SelectItem value={"cover"}>Cover</SelectItem>
              <SelectItem value={"gif"}>GIF</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {user && (
        <Card
          card={{
            user,
            updatedAt: new Date(),
            content: "hello",
            ...(cardType === "bilibili"
              ? {
                  type: "bilibili",
                  src: v,
                  displayType,
                }
              : {
                  type: "plain",
                  backgroundImage: v,
                }),
          }}
        />
      )}
    </FlexContainer>
  )
}
