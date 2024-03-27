"use client"

import { useAtom } from "jotai"
import { useEffect, useState } from "react"
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
import { CardType } from "../schema/card"
import {
  bilibiliVideoControlEnabledAtom,
  cardTypeAtom,
  platformTypeAtom,
} from "../store/card.atom"

export const Controls = ({ copyCard }: { copyCard: () => Promise<void> }) => {
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )
  const [platformType] = useAtom(platformTypeAtom)

  const [coping, setCoping] = useState(false)

  useEffect(() => {
    if (
      (platformType === "bilibili" &&
        !["text-image", "text-iframe"].includes(cardType)) ||
      (platformType === "xiaohongshu" &&
        !["text-image", "text-video"].includes(cardType))
    ) {
      setCardType("text-image")
    }
  }, [platformType])

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
            <SelectItem value={"text-image" as CardType}>Image</SelectItem>

            <SelectItem
              value={"text-video" as CardType}
              disabled={platformType !== "xiaohongshu"}
            >
              Video （目前支持：小红书）
            </SelectItem>

            <SelectItem
              value={"text-iframe" as CardType}
              disabled={platformType !== "bilibili"}
            >
              IFrame （目前支持：B站）
            </SelectItem>

            <SelectItem value={"text" as CardType} disabled>
              Plain Text (todo)
            </SelectItem>

            <SelectItem value={"text-gif" as CardType} disabled>
              GIF (todo)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {cardType === "text-iframe" && (
        <>
          <Label className={"shrink-0"}>Show IFrame Controls</Label>
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
