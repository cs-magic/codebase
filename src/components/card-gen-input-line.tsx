"use client"

import { useAtom, useSetAtom } from "jotai"
import { toast } from "sonner"
import { Button } from "../../packages/common-ui-shadcn/components/button"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Badge } from "../../packages/common-ui-shadcn/components/ui/badge"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"
import { genCardFromUrl } from "../core/gen-card"

import {
  cardBodyAtom,
  cardGenOptionsAtom,
  cardInputUrlAtom,
  cardRenderStatusAtom,
} from "../store/card.atom"

export const InputLine = () => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom)
  const setCardBody = useSetAtom(cardBodyAtom)
  const [options] = useAtom(cardGenOptionsAtom)
  const [cardRenderStatus] = useAtom(cardRenderStatusAtom)

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

      <Badge id={"card-render-status"}>{cardRenderStatus}</Badge>

      <Button
        id={"generate-card"}
        onClick={() => {
          genCardFromUrl(inputUrl, options)
            .then(setCardBody)
            .catch((e) => {
              console.error(e)
              if ("message" in e) toast.error(e.message as string)
            })
        }}
      >
        Generate Card
      </Button>
    </div>
  )
}
