"use client"

import { useAtom } from "jotai"
import { fetchEngines } from "../../packages/common-common/schema"
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
  cardMdWithImgAtom,
  refetchCardCommentsAtom,
  refetchCardPageAtom,
  refetchCardStatAtom,
  summaryModelAtom,
} from "../store/card.atom"
import { GenCardAction1 } from "./gen-card-action-1"
import { GenCardInputUrl } from "./gen-card-input-url"
import { GenCardInputUser } from "./gen-card-input-user"

export const GenCardViaFrontend = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  )

  return (
    <>
      <GenCardInputUrl />

      <GenCardInputUser />

      <Separator orientation={"horizontal"} />

      <>
        {[
          { atom: refetchCardPageAtom, name: "refetch-page" },
          { atom: summaryModelAtom, name: "refetch-summary" },
          { atom: refetchCardStatAtom, name: "refetch-stat" },
          { atom: refetchCardCommentsAtom, name: "refetch-comments" },
        ].map((item, index) => (
          <AtomSwitcher {...item} key={index} />
        ))}
      </>

      <Separator orientation={"horizontal"} />

      <AtomSelector
        atom={cardFetchEngineAtom}
        name={"fetch engine"}
        vs={fetchEngines}
      />
      <>
        {[{ atom: cardMdWithImgAtom, name: "md-with-img" }].map(
          (item, index) => (
            <AtomSwitcher {...item} key={index} />
          ),
        )}
      </>

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
        <GenCardAction1 type={"generate"} />
        <GenCardAction1 type={"reset"} />
      </div>
    </>
  )
}
