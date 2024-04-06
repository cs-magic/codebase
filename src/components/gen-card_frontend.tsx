"use client"

import { useAtom, useSetAtom } from "jotai"
import { toast } from "sonner"
import { fetchEngines } from "../../packages/common-general/schema"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import {
  AtomSelector,
  AtomSwitcher,
} from "../../packages/common-ui/components/atom-switcher"
import { genCardFromUrl } from "../core/gen-card"
import {
  cardFetchEngineAtom,
  cardGenOptionsAtom,
  cardInputAtom,
  cardInputUrlAtom,
  cardMdWithImgAtom,
  refetchCardCommentsAtom,
  refetchCardPageAtom,
  refetchCardStatAtom,
  refetchCardSummaryAtom,
} from "../store/card.atom"
import { GenCardActionButton } from "./gen-card-action-button"
import { GenCardInputUrl } from "./gen-card-input-url"

export const GenCardViaFrontend = () => {
  const [inputUrl] = useAtom(cardInputUrlAtom)
  const [options] = useAtom(cardGenOptionsAtom)
  const setCardInput = useSetAtom(cardInputAtom)

  return (
    <>
      <GenCardInputUrl />

      <Separator orientation={"horizontal"} />

      <>
        {[
          { atom: refetchCardPageAtom, name: "refetch-page" },
          { atom: refetchCardSummaryAtom, name: "refetch-summary" },
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

      <GenCardActionButton
        className={"w-full"}
        action={async () => {
          await genCardFromUrl(inputUrl, options)
            .then((card) => setCardInput(JSON.stringify(card)))
            .catch((err) => toast.error((err as unknown as Error).message))
        }}
        type={"generate"}
      />
    </>
  )
}
