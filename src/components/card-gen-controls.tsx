"use client"

import { useAtom, WritableAtom } from "jotai"
import { RESET } from "jotai/utils"
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
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { CardType } from "../schema/card"
import {
  bilibiliVideoControlEnabledAtom,
  cardBodyAtom,
  cardCommentsCacheIgnoredAtom,
  cardCommentsEnabledAtom,
  cardStatCacheIgnoredAtom,
  cardStatEnabledAtom,
  cardSummaryCacheIgnoredAtom,
  cardSummaryEnabledAtom,
  cardTypeAtom,
} from "../store/card.atom"

export const Controls = ({
  copyCard,
  downloadCard,
}: {
  copyCard: () => Promise<void>
  downloadCard: () => Promise<void>
}) => {
  const [cardBody] = useAtom(cardBodyAtom)
  const platformType = cardBody?.platform
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )

  const [coping, setCoping] = useState(false)
  const [downloading, setDownloading] = useState(false)

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
    <div className={"flex flex-col"}>
      <FlexContainer orientation={"horizontal"}>
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
          id={"copy-card"}
          loading={coping}
          onClick={async () => {
            setCoping(true)
            await copyCard()
            setCoping(false)
          }}
        >
          Copy Card
        </ButtonWithLoading>

        <ButtonWithLoading
          id={"download-card"}
          loading={downloading}
          onClick={async () => {
            setDownloading(true)
            await downloadCard()
            setDownloading(false)
          }}
        >
          Download Card
        </ButtonWithLoading>
      </FlexContainer>

      <div className={"grid grid-cols-3 p-2 gap-2"}>
        <AtomSwitcher atom={cardSummaryEnabledAtom} name={"Summary Enabled"} />

        <AtomSwitcher atom={cardStatEnabledAtom} name={"Stat Enabled"} />

        <AtomSwitcher
          atom={cardCommentsEnabledAtom}
          name={"Comments Enabled"}
        />

        <AtomSwitcher
          atom={cardSummaryCacheIgnoredAtom}
          name={"Summary Cache Ignored"}
        />
        <AtomSwitcher
          atom={cardStatCacheIgnoredAtom}
          name={"Stat Cache Ignored"}
        />
        <AtomSwitcher
          atom={cardCommentsCacheIgnoredAtom}
          name={"Comments Cache Ignored"}
        />
      </div>
    </div>
  )
}

type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET)

export const AtomSwitcher = ({
  atom,
  name,
}: {
  atom: WritableAtom<boolean, [SetStateActionWithReset<boolean>], void>
  name: string
}) => {
  const [v, setV] = useAtom(atom)

  return (
    <div className={"flex items-center gap-2 justify-between"}>
      <Label className={"shrink-0"}>{name}</Label>
      <Switch checked={v} onCheckedChange={setV} />
    </div>
  )
}
