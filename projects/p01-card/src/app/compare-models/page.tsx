import { ICardDetail } from "@cs-magic/prisma/schema/card.detail";
import { promises } from "fs";
import sortBy from "lodash/sortBy";
import path from "path";
import React from "react";
import moment from "../../../../../packages/common-datetime/moment";
import { ICallLLMResponse } from "../../../../../packages/common-llm/schema/llm";
import { Path } from "../../../../../packages/common-path";
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container";
import { LabelLine } from "../../../../../packages/common-ui/components/label-line";
import { CardPreview } from "../../components/card-preview";
import { StandardCard } from "../../components/standard-card";

export default async function CompareModelsPage() {
  const ts = (await promises.readdir(Path.generatedDir)).filter((n) =>
    /^\d+$/.test(n),
  );

  const data = await Promise.all(
    ts.map(async (t) => {
      const dir = path.join(Path.generatedDir, t.toString());

      const cardNames = (await promises.readdir(dir)).filter((s) =>
        s.startsWith("wxmp-article"),
      );

      const cards: ICardDetail[] = await Promise.all(
        cardNames.map(async (cardName) => {
          return JSON.parse(
            await promises.readFile(path.join(dir, cardName), {
              encoding: "utf-8",
            }),
          ) as ICardDetail;
        }),
      );

      return { t: Number(t), cards };
    }),
  );

  return (
    <FlexContainer orientation={"vertical"} className={"justify-start"}>
      {data.map(({ t, cards }) => (
        <RenderT t={t} cards={cards} key={t} />
      ))}
    </FlexContainer>
  );
}

const RenderT = ({ cards, t }: { t: number; cards: ICardDetail[] }) => {
  return (
    <StandardCard title={moment(t).format("MM/DD HH:mm")}>
      <div
        className={
          "grid w-fit grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {sortBy(cards, (c: ICardDetail) => {
          const contentSummary = c.contentSummary as ICallLLMResponse | null;
          const query = contentSummary?.query;
          if (!query?.end) return 99999; // 没有完成的，放最后
          return query.end - query.start;
        }).map((card, index) => {
          const summary = card.contentSummary as ICallLLMResponse | null;
          const options = summary?.options;
          const query = summary?.query;

          return (
            <div className={"flex flex-col gap-2"} key={index}>
              <LabelLine title={"Model"}>{options?.model}</LabelLine>

              <LabelLine title={"TopP"}>{options?.topP ?? "-"}</LabelLine>

              <LabelLine title={"Temperature"}>
                {options?.temperature ?? "-"}
              </LabelLine>

              <LabelLine title={"Latency"}>
                {!query?.end
                  ? "-"
                  : `${((query.end - query.start) / 1e3).toFixed(2)}s`}
              </LabelLine>

              <CardPreview key={index} card={card} />
            </div>
          );
        })}
      </div>
    </StandardCard>
  );
};
