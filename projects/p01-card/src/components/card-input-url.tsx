"use client";

import { useAtom } from "jotai";
import React from "react";
import { Input } from "../../../../packages/ui-shadcn/components/input";
import { LabelLine } from "../../../../packages/ui/components/label-line";

import { config } from "../config";
import { cardInputUrlAtom } from "../store/card.atom";

export const CardInputUrl = () => {
  const [inputUrl, setInputUrl] = useAtom(cardInputUrlAtom);

  return (
    <LabelLine title={"url"}>
      <Input
        id={"card-input-url"}
        placeholder={config.card.genInputPlaceHolder}
        className={"grow"}
        value={inputUrl}
        onChange={(event) => {
          setInputUrl(event.currentTarget.value);
        }}
      />
    </LabelLine>
  );
};
