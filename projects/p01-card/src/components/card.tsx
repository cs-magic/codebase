"use client";

import { useAtomValue } from "jotai";
import React from "react";
import { useSearchParam } from "../../../../packages/hooks/use-search-param";
import { Input } from "../../../../packages/ui-shadcn/components/input";
import { Separator } from "../../../../packages/ui-shadcn/components/separator";
import { cn } from "../../../../packages/ui-shadcn/utils";
import { AtomSelector } from "../../../../packages/ui/components/atom-switcher";
import { cardPreviewEngineTypeSchema, GenCardApproach } from "../schema/card";
import { cardPreviewAtom, cardPreviewEngineAtom } from "../store/card.atom";
import { CardInputBackend } from "./card-input-backend";
import { CardInputFrontend } from "./card-input-frontend";
import { CardPreview } from "./card-preview";
import { StandardCard } from "./standard-card";

export const Card = () => {
  const preview = useAtomValue(cardPreviewAtom);
  const renderType =
    useSearchParam<GenCardApproach>("renderType") ?? "frontend";

  const Input = renderType === "backend" ? CardInputBackend : CardInputFrontend;

  // console.log({ preview });

  return (
    <div
      className={cn(
        "mx-auto grid h-full w-full grid-cols-1 gap-4 overflow-auto p-2 sm:grid-cols-2 sm:p-4",
      )}
    >
      <StandardCard title={"Input Control"}>
        <Input />
      </StandardCard>

      <StandardCard title={"Preview"} id={"card-previews"}>
        <AtomSelector
          atom={cardPreviewEngineAtom}
          name={"preview-engine"}
          vs={cardPreviewEngineTypeSchema.options}
        />

        <Separator orientation={"horizontal"} />

        <CardPreview
          genCardApproach={renderType}
          preview={preview ?? undefined}
          withActions
        />
      </StandardCard>
    </div>
  );
};
