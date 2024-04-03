"use client"

import { useAtom } from "jotai"
import { RefObject } from "react"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"

import { config } from "../config/system"
import {
  cardAuthorWithTitleAtom,
  cardControls,
  cardInputUrlAtom,
  cardRenderedAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom"
import { ActionButton } from "./card-action-button"
import { StandardCard } from "./standard-card"

export const Controls = ({ obj }: { obj: RefObject<HTMLDivElement> }) => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)
  const [rendered] = useAtom(cardRenderedAtom)

  return (
    <div className={"w-full p-2 flex flex-col"}>
      <StandardCard title={"Input"} type={"beauty"}>
        <LabelLine title={"Url"}>
          <Input
            id={"card-input-url"}
            placeholder={config.card.genInputPlaceHolder}
            className={"grow"}
            value={inputUrl}
            onChange={(event) => {
              setInputUrl(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"Name"}>
          <Input
            id={"card-user-name"}
            value={cardUserName}
            onChange={(event) => {
              setCardUserName(event.currentTarget.value)
            }}
          />
        </LabelLine>

        <LabelLine title={"Avatar"}>
          <Input
            id={"card-user-avatar"}
            value={cardUserAvatar}
            onChange={(event) => {
              setCardUserAvatar(event.currentTarget.value)
            }}
          />
        </LabelLine>
      </StandardCard>

      <StandardCard title={"Generate"} type={"beauty"}>
        {cardControls.map((item, index) => (
          <AtomSwitcher {...item} key={index} />
        ))}
      </StandardCard>

      <StandardCard title={"Display"} type={"beauty"}>
        <AtomSwitcher
          atom={cardAuthorWithTitleAtom}
          name={"Author With Title"}
        />
      </StandardCard>

      <StandardCard title={"Actions"} type={"beauty"}>
        <div className={"flex gap-2"}>
          <ActionButton obj={obj} type={"generate"} />
          <ActionButton obj={obj} type={"copy"} disabled={!rendered} />
          <ActionButton obj={obj} type={"download"} disabled={!rendered} />
          <ActionButton obj={obj} type={"upload"} disabled={!rendered} />
        </div>
      </StandardCard>
    </div>
  )
}
