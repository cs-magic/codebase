import { promises } from "fs"
import { sortBy } from "lodash"
import path from "path"
import React from "react"
import { generatedPath } from "../../../packages/common-common/path"
import moment from "../../../packages/common-datetime/moment"
import { FlexContainer } from "../../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../../packages/common-ui/components/label-line"
import { CardPreview } from "../../components/card-preview"
import { StandardCard } from "../../components/standard-card"
import { ICardDetail } from "../../schema/card.basic"

export default async function CompareModelsPage() {
  const ts = (await promises.readdir(generatedPath)).filter((n) =>
    /^\d+$/.test(n),
  )

  return (
    <FlexContainer orientation={"vertical"} className={"justify-start"}>
      {ts.map((t) => (
        <RenderT t={Number(t)} key={t} />
      ))}
    </FlexContainer>
  )
}

const RenderT = async ({ t }: { t: number }) => {
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
    <StandardCard title={moment(t).format("MM/DD HH:mm")}>
      <div
        className={
          "w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        }
      >
        {sortBy(
          cards,
          (c) => c.contentSummary?.query.end - c.contentSummary?.query.start,
        ).map((card, index) => {
          const options = card.contentSummary?.options
          const query = card.contentSummary?.query
          return (
            <div className={"flex flex-col gap-2"} key={index}>
              <LabelLine title={"Model"}>{options.model}</LabelLine>

              <LabelLine title={"TopP"}>{options.topP ?? "-"}</LabelLine>

              <LabelLine title={"Temperature"}>
                {options.temperature ?? "-"}
              </LabelLine>

              <LabelLine
                title={"Latency"}
              >{`${((query?.end - query?.start) / 1e3).toFixed(2)}s`}</LabelLine>

              <CardPreview key={index} card={card} />
            </div>
          )
        })}
      </div>
    </StandardCard>
  )
}
