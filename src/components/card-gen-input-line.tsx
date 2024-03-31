"use client"

import { useAtom, useSetAtom } from "jotai"
import { toast } from "sonner"
import { Button } from "../../packages/common-ui-shadcn/components/button"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"

import {
  cardBodyAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
} from "../store/card.atom"
import { genCardFromUrl } from "../core/parse-card"

export const InputLine = () => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)
  const setCardBody = useSetAtom(cardBodyAtom)
  const [options] = useAtom(cardGenOptionsAtom)

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

      <Button
        id={"generate-card"}
        onClick={async () => {
          const card = await genCardFromUrl(inputUrl, options)
          console.log("-- parsed card: ", card)
          if (!card.success) return toast.error(card.message)
          setCardBody(card.data)
        }}
      >
        Generate Card
      </Button>
    </div>
  )
}
