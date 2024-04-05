"use client"

import { useAtom, useSetAtom } from "jotai"
import { toast } from "sonner"
import { Separator } from "../../packages/common-ui-shadcn/components/separator"
import { AtomSwitcher } from "../../packages/common-ui/components/atom-switcher"
import { genCardFromUrl } from "../core/gen-card"
import {
  cardAtom,
  cardControls,
  cardGenOptionsAtom,
  cardInputUrlAtom,
} from "../store/card.atom"
import { GenCardActionButton } from "./gen-card-action-button"
import { GenCardInputUrl } from "./gen-card-input-url"
import { GenCardInputUser } from "./gen-card-input-user"

export const GenCardViaFrontend = () => {
  const [inputUrl] = useAtom(cardInputUrlAtom)
  const setCard = useSetAtom(cardAtom)
  const [cardOptions] = useAtom(cardGenOptionsAtom)

  return (
    <>
      <GenCardInputUrl />

      <Separator orientation={"horizontal"} />

      <GenCardInputUser />

      <Separator orientation={"horizontal"} />

      <>
        {cardControls.map((item, index) => (
          <AtomSwitcher {...item} key={index} />
        ))}
      </>

      <Separator orientation={"horizontal"} />

      <GenCardActionButton
        className={"w-full"}
        action={async () => {
          genCardFromUrl(inputUrl, cardOptions)
            .then(setCard)
            .catch((err) => toast.error((err as unknown as Error).message))
        }}
        type={"generate"}
      />
    </>
  )
}
