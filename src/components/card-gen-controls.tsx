"use client"

import { useAtom, WritableAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useState } from "react"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { Switch } from "../../packages/common-ui-shadcn/components/switch"
import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import {
  cardCommentsCacheIgnoredAtom,
  cardCommentsEnabledAtom,
  cardStatCacheIgnoredAtom,
  cardStatEnabledAtom,
  cardSummaryCacheIgnoredAtom,
  cardSummaryEnabledAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom"

export const Controls = ({
  copyCard,
  downloadCard,
}: {
  copyCard: () => Promise<void>
  downloadCard: () => Promise<void>
}) => {
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)

  const [coping, setCoping] = useState(false)
  const [downloading, setDownloading] = useState(false)

  return (
    <div className={"flex flex-col"}>
      <FlexContainer orientation={"horizontal"}>
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

      <FlexContainer>
        <LabelLine title={"User Avatar"}>
          <Input
            id={"user-avatar"}
            value={cardUserAvatar}
            onChange={(event) => {
              setCardUserAvatar(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"User Name"}>
          <Input
            id={"user-name"}
            value={cardUserName}
            onChange={(event) => {
              setCardUserName(event.currentTarget.value)
            }}
          />
        </LabelLine>
      </FlexContainer>
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
