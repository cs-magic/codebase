import { useAtom } from "jotai";
import React from "react";
import { Textarea } from "../../../../common/ui/components/textarea-auto";
import { cardInputAtom } from "../store/card.atom";
import { CardInputUser } from "./card-input-user";

export const CardInputBackend = () => {
  const [cardInput, setCardInput] = useAtom(cardInputAtom);

  return (
    <>
      <CardInputUser />

      <Textarea
        id={"card-content"}
        minRows={10}
        maxRows={20}
        value={cardInput}
        onChange={(event) => {
          setCardInput(event.currentTarget.value);
        }}
      />
    </>
  );
};
