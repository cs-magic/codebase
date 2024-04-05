import { useAtom } from "jotai"
import React from "react"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { config } from "../config/system"
import { cardInputUrlAtom } from "../store/card.atom"
import { StandardCard } from "./standard-card"

export const GenCardInputUrl = () => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)

  return (
    <StandardCard title={"Input Url"} type={"beauty"}>
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
    </StandardCard>
  )
}
