"use client"

import { useAtom } from "jotai"
import { useState } from "react"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common-ui-shadcn/components/select"
import { Switch } from "../../packages/common-ui-shadcn/components/switch"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import {
  bilibiliVideoControlEnabledAtom,
  CardType,
  cardTypeAtom,
  platformTypeAtom,
} from "../app/(sub)/card/gen/store"

export const Controls = ({ copyCard }: { copyCard: () => Promise<void> }) => {
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )
  const [coping, setCoping] = useState(false)
  const [sourceType] = useAtom(platformTypeAtom)

  return (
    <div className={"flex items-center gap-2"}>
      <Label className={"shrink-0"}>Display Type</Label>
      <Select
        value={cardType}
        onValueChange={(v) => setCardType(v as CardType)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"text-image" as CardType}>
              Text with Image
            </SelectItem>
            <SelectItem value={"text-video" as CardType}>
              Text with Video
            </SelectItem>
            <SelectItem value={"text" as CardType} disabled>
              Plain Text (todo)
            </SelectItem>
            <SelectItem value={"text-gif" as CardType} disabled>
              Text with GIF (todo)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {cardType === "text-video" && (
        <>
          <Label className={"shrink-0"}>Show Video Controls</Label>
          <Switch
            checked={bilibiliVideoControlEnabled}
            onCheckedChange={setBilibiliVideoControlEnabled}
          />
        </>
      )}

      <ButtonWithLoading
        loading={coping}
        onClick={async () => {
          setCoping(true)
          await copyCard()
          setCoping(false)
        }}
      >
        Copy Card
      </ButtonWithLoading>
    </div>
  )
}
