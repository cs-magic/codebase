"use client"

import { useRef, useState } from "react"

import { BilibiliDisplayType } from "../../../../../packages/common-bilibili/schema"
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
import { Switch } from "../../../../../packages/common-ui/shadcn/shadcn-components/switch"
import { Card, CardType } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"

export default function GenCardPage() {
  const [v, setV] = useState("")
  const user = useUserSummary()
  const [cardType, setCardType] = useState<CardType>("bilibili")
  const [displayType, setDisplayType] = useState<BilibiliDisplayType>("video")
  const refInput = useRef<HTMLInputElement>(null)
  const [showContorl, setShowControl] = useState(false)

  return (
    <FlexContainer orientation={"vertical"}>
      <div className={"w-full flex items-center gap-4"}>
        <Input defaultValue={v} ref={refInput} />

        <Button
          onClick={() => {
            if (!refInput.current) return
            setV(refInput.current.value)
          }}
        >
          Generate
        </Button>
      </div>

      <div className={"flex items-center gap-2"}>
        <Label className={"shrink-0"}>Show Controls</Label>
        <Switch checked={showContorl} onCheckedChange={setShowControl} />

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
          style={{
            width: showContorl ? 420 : 419,
          }}
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
