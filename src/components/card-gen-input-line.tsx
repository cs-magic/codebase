"use client"

import { useAtom } from "jotai"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"

import { cardInputUrlAtom } from "../store/card.atom"

export const InputLine = () => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)

  return (
    <div className={"w-full flex items-center gap-4"}>
      <Input
        id={"input-url"}
        placeholder={GEN_CARD_INPUT_PLACEHOLDER}
        className={"grow"}
        value={inputUrl}
        onChange={(event) => {
          setInputUrl(event.currentTarget.value)
        }}
      />
    </div>
  )
}
