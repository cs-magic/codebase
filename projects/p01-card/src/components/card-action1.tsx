import { logger } from "@cs-magic/log/logger"
import { useAtom, useSetAtom } from "jotai"
import { ICallLlmResponse } from "../../../../packages/llm/schema/llm"
import { Action1Type } from "../schema/card"
import {
  articleInputAtom,
  cardArticleUrlAtom,
  cardGenOptionsAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
  llmResponseInputAtom,
} from "../store/card.atom"
import { CardAction } from "./card-action"
import { genCardFromUrl } from "@/utils/gen-card"

export const CardAction1 = ({ type }: { type: Action1Type }) => {
  const [inputUrl] = useAtom(cardArticleUrlAtom)
  const [options] = useAtom(cardGenOptionsAtom)
  const setLlmResponseInput = useSetAtom(llmResponseInputAtom)
  const setCardUserName = useSetAtom(cardUserNameAtom)
  const setCardUserAvatar = useSetAtom(cardUserAvatarAtom)
  const setArticleInput = useSetAtom(articleInputAtom)

  const action = async () => {
    switch (type) {
      case "generate":
        const generated = await genCardFromUrl(inputUrl, options)
        logger.info("generated: %o", generated)
        setLlmResponseInput(JSON.stringify(generated.llmResponse))
        setArticleInput(JSON.stringify(generated.article))
        break

      case "reset":
        setLlmResponseInput("")
        setCardUserName("")
        setCardUserAvatar("")
        break
    }
  }

  return <CardAction action={action} type={type} />
}
