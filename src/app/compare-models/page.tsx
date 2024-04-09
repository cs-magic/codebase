import { promises } from "fs"
import path from "path"
import React from "react"
import { parseSummary } from "../../../packages/common-llm/parse-summary"
import { generatedPath } from "../../../packages/common-common/path"
import moment from "../../../packages/common-datetime/moment"
import { FlexContainer } from "../../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../../packages/common-ui/components/label-line"
import { CardPreview } from "../../components/card-preview"
import { StandardCard } from "../../components/standard-card"
import { ICardDetail } from "../../schema/card.basic"

export default async function CompareModelsPage() {
  // const t = 1712651015842
  const t = 1712652669879
  const dir = path.join(generatedPath, t.toString())

  const cardNames = (await promises.readdir(dir)).filter((s) =>
    s.startsWith("wxmp-article"),
  )

  const cards = await Promise.all(
    cardNames.map(async (cardName) => {
      return JSON.parse(
        await promises.readFile(path.join(dir, cardName), {
          encoding: "utf-8",
        }),
      ) as ICardDetail
    }),
  )

  return (
    <FlexContainer className={"items-start"}>
      <StandardCard title={"Params"} className={"w-fit"}>
        <LabelLine title={"Date"}>{moment(t).format("MM/DD HH:mm")}</LabelLine>
      </StandardCard>

      {cards.map((card, index) => {
        const summary = parseSummary(card.contentSummary)
        return (
          <div className={"flex flex-col gap-2"} key={index}>
            <LabelLine title={"Model"}>{summary.model?.name}</LabelLine>
            <LabelLine title={"TopP"}>{summary.model?.topP ?? "-"}</LabelLine>
            <LabelLine title={"Temperature"}>
              {summary.model?.temperature ?? "-"}
            </LabelLine>

            <CardPreview key={index} card={card} />
          </div>
        )
      })}
    </FlexContainer>
  )
}
