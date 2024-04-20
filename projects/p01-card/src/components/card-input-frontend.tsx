import { useAtom } from "jotai";
import React from "react";
import { backendTypeSchema } from "../../../../packages/llm/schema/llm";
import { llmModelTypeSchema } from "../../../../packages/llm/schema/providers";
import { Input } from "../../../../packages/ui-shadcn/components/input";
import { Separator } from "../../../../packages/ui-shadcn/components/separator";
import {
  AtomSelector,
  AtomSwitcher,
} from "../../../../packages/ui/components/atom-switcher";
import { LabelLine } from "../../../../packages/ui/components/label-line";
import { mapSpacingVerticalAtom } from "../../../../packages/visualization/store";
import {
  cardAuthorWithTitleAtom,
  cardFetchEngineAtom,
  cardLLMEnabledAtom,
  cardLLMTypeAtom,
  cardMdWithImgAtom,
  cardRefetchCardAtom,
  cardRefetchCommentsAtom,
  cardRefetchPageAtom,
} from "../store/card.atom";
import { CardAction1 } from "./card-action1";
import { CardInputUrl } from "./card-input-url";
import { CardInputUser } from "./card-input-user";

export const CardInputFrontend = () => {
  const [mapSpacingVertical, setMapSpacingVertical] = useAtom(
    mapSpacingVerticalAtom,
  );
  return (
    <>
      <CardInputUrl />

      <CardInputUser />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardRefetchPageAtom} name={"refetch-page"} />

      <AtomSwitcher atom={cardLLMEnabledAtom} name={"llm-enabled"} />

      <AtomSelector
        atom={cardLLMTypeAtom}
        name={"llm-type"}
        vs={llmModelTypeSchema.options}
      />

      <AtomSwitcher atom={cardRefetchCardAtom} name={"refetch-stat"} />

      <AtomSwitcher atom={cardRefetchCommentsAtom} name={"refetch-comments"} />

      <Separator orientation={"horizontal"} />

      <AtomSelector
        atom={cardFetchEngineAtom}
        name={"fetch engine"}
        vs={backendTypeSchema.options}
      />

      <AtomSwitcher atom={cardMdWithImgAtom} name={"md-with-img"} />

      <Separator orientation={"horizontal"} />

      <AtomSwitcher atom={cardAuthorWithTitleAtom} name={"author.with-title"} />

      <LabelLine title={"map.vertical.space"}>
        <Input
          type={"number"}
          value={mapSpacingVertical ?? 0}
          onChange={(event) => {
            setMapSpacingVertical(Number(event.currentTarget.value));
          }}
        />
      </LabelLine>

      <Separator orientation={"horizontal"} />

      <div className={"flex items-center gap-2"}>
        <CardAction1 type={"generate"} />
        <CardAction1 type={"reset"} />
      </div>
    </>
  );
};
