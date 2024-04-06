import { useAtom, useSetAtom } from "jotai"
import { genCardFromUrl } from "../core/gen-card"
import { Action1Type } from "../schema/card"
import {
  cardGenOptionsAtom,
  cardInputAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom"
import { GenCardActionButton } from "./gen-card-action-button"

export const GenCardAction1 = ({ type }: { type: Action1Type }) => {
  const [inputUrl] = useAtom(cardInputAtom)
  const [options] = useAtom(cardGenOptionsAtom)
  const setCardInput = useSetAtom(cardInputAtom)
  const setCardUserName = useSetAtom(cardUserNameAtom)
  const setCardUserAvatar = useSetAtom(cardUserAvatarAtom)

  const action = async () => {
    switch (type) {
      case "generate":
        const d = await genCardFromUrl(inputUrl, options)
        setCardInput(JSON.stringify(d))
        break

      case "reset":
        setCardInput("")
        setCardUserName("")
        setCardUserAvatar("")
        break
    }
  }

  return <GenCardActionButton action={action} type={type} />
}
