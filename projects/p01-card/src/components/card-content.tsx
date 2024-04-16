"use client";

import { ICardDetail } from "@cs-magic/prisma/schema/card.detail";
import { parseSummary } from "../../../../packages/common-llm/parse-summary";
import { cn } from "../../../../packages/common-ui-shadcn/utils";
import MarkMap from "../../../../packages/common-visualization/markmap";
import { CardContentAuthor } from "./card-content-author";
import { Cover } from "./card-content-cover";
import { Stat } from "./card-content-stat";
import { Tags } from "./card-content-tags";

export const CardContent = ({ card }: { card?: ICardDetail | null }) => {
  const summary = parseSummary(
    card?.contentSummary?.response?.choices[0].message.content as
      | string
      | null
      | undefined,
  );

  // console.log("-- summary: ", summary)

  return (
    <div
      className={"relative m-2 overflow-hidden rounded-lg bg-white text-black"}
    >
      <div className={"flex grow flex-col overflow-hidden"}>
        <Cover cover={card?.cover} />

        <div className={"flex flex-col gap-2 p-2"}>
          <h1 className={"shrink-0 text-lg font-bold"}>{card?.title}</h1>

          <Tags tags={summary?.tags} />

          <Stat stat={card?.stat} />

          <div className={"rounded-lg bg-slate-100 p-2 text-sm"}>
            {summary?.description}
          </div>

          <MarkMap content={summary?.mindmap} />

          <CardContentAuthor card={card} />

          <div className={"mt-2 text-center text-xs text-muted-foreground/25"}>
            该内容由
            <span
              className={cn(
                // "underline",
                " mx-1",
              )}
            >
              {card?.contentSummary?.options.model?.toUpperCase()} 大模型
              {/*大模型*/}
            </span>
            生成
          </div>
        </div>
      </div>
    </div>
  );
};
