import { useAtom, useSetAtom } from "jotai";
import { genCardFromUrl } from "../core/gen-card";
import { Action1Type } from "../schema/card";
import {
  cardGenOptionsAtom,
  llmResponseInputAtom,
  cardArticleUrlAtom,
  cardUserAvatarAtom,
  cardUserNameAtom,
} from "../store/card.atom";
import { CardAction } from "./card-action";

export const CardAction1 = ({ type }: { type: Action1Type }) => {
  const [inputUrl] = useAtom(cardArticleUrlAtom);
  const [options] = useAtom(cardGenOptionsAtom);
  const setCardInput = useSetAtom(llmResponseInputAtom);
  const setCardUserName = useSetAtom(cardUserNameAtom);
  const setCardUserAvatar = useSetAtom(cardUserAvatarAtom);

  const action = async () => {
    switch (type) {
      case "generate":
        const d = await genCardFromUrl(inputUrl, options);
        setCardInput(JSON.stringify(d.llmResponse));
        break;

      case "reset":
        setCardInput("");
        setCardUserName("");
        setCardUserAvatar("");
        break;
    }
  };

  return <CardAction action={action} type={type} />;
};
