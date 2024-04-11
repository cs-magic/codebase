import { useAtom } from "jotai"
import React from "react"
import { backendEngineTypeSchema } from "../../packages/common-llm/schema/llm"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import {
  AtomSelector,
  AtomSwitcher,
} from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import {
  cardAuthorWithTitleAtom,
  cardFetchEngineAtom,
  cardLLMEnabledAtom,
  cardLLMTypeAtom,
  cardMdWithImgAtom,
  cardRefetchCardAtom,
  cardRefetchCommentsAtom,
  cardRefetchPageAtom,
} from "../store/card.atom"
import { CardAction1 } from "./card-action1"
import { CardInputUrl } from "./card-input-url"
import { CardInputUser } from "./card-input-user"

export const CardInputFrontend = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )
  return (
    <>
      <CardInputUrl />

      <CardInputUser />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardRefetchPageAtom} name={"refetch-page"} />

      <AtomSwitcher atom={cardLLMEnabledAtom} name={"llm-enabled"} />

      <AtomSelector
        atom={cardLLMTypeAtom}
        name={"llm-type"}
        vs={[
          "gpt-3.5-turbo",
          "gpt-4",
          "glm-4",
          "moonshot-v1-8k",
          "moonshot-v1-32k",
          "moonshot-v1-128k",
        ]}
      />

      <AtomSwitcher atom={cardRefetchCardAtom} name={"refetch-stat"} />

      <AtomSwitcher atom={cardRefetchCommentsAtom} name={"refetch-comments"} />

      <Separator orientation={"horizontal"} />

      <AtomSelector
        atom={cardFetchEngineAtom}
        name={"fetch engine"}
        vs={backendEngineTypeSchema.options.map((o) => o.value)}
      />

      <AtomSwitcher atom={cardMdWithImgAtom} name={"md-with-img"} />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardAuthorWithTitleAtom} name={"author.with-title"} />

      <LabelLine title={"map.vertical.space"}>
        <Input
          type={"number"}
          value={mapSpacingVertical ?? 0}
          onChange={(event) => {
            setMapSpacingVertical(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>

      <Separator orientation={"horizontal"} />

      <div className={"flex items-center gap-2"}>
        <CardAction1 type={"generate"} />
        <CardAction1 type={"reset"} />
      </div>
    </>
  )
}
