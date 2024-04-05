"use client"

import { useAtom } from "jotai"
import { Input } from "../../packages/common-ui-shadcn/components/input"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { mapSpacingVerticalAtom } from "../../packages/common-visualization/store"
import { cardAuthorWithTitleAtom } from "../store/card.atom"
import { StandardCard } from "./standard-card"

export const GenCardConfigDisplay = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )

  return (
    <StandardCard title={"Display Control"}>
      <AtomSwitcher atom={cardAuthorWithTitleAtom} name={"Author With Title"} />
      <LabelLine title={"Map Vertical Space"}>
        <Input
          type={"number"}
          value={mapSpacingVertical ?? 0}
          onChange={(event) => {
            setMapSpacingVertical(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>
    </StandardCard>
  )
}
