import { logger } from "@cs-magic/common"
import { Action1Type } from "@cs-magic/swot-bot/core"
import { useAtom, useSetAtom } from "jotai"
import { cardArticleUrlAtom, cardInnerInputAtom } from "../store/card.atom"
import { cardGenOptionsAtom } from "../store/card.gen.atom"
import { cardUserAvatarAtom, cardUserNameAtom } from "../store/card.user.atom"
import { genCardFromUrl } from "../utils/gen-card"
import { GeneralCardAction } from "./card-action-general"

export const InputCardAction = ({ type }: { type: Action1Type }) => {
  const [inputUrl] = useAtom(cardArticleUrlAtom)
  const [options] = useAtom(cardGenOptionsAtom)
  const setCardInnerInput = useSetAtom(cardInnerInputAtom)
  const setCardUserName = useSetAtom(cardUserNameAtom)
  const setCardUserAvatar = useSetAtom(cardUserAvatarAtom)

  const action = async () => {
    switch (type) {
      case "generate":
        const generated = await genCardFromUrl(inputUrl, options)
        logger.info("generated: %o", generated)
        logger.info(JSON.stringify(generated))
        setCardInnerInput(JSON.stringify(generated))
        break

      case "reset":
        setCardInnerInput("")
        setCardUserName("")
        setCardUserAvatar("")
        break
    }
  }

  return <GeneralCardAction action={action} type={type} />
}
