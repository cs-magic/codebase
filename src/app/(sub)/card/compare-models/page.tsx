import { promises } from "fs"
import path from "path"
import { generatedPath } from "../../../../../packages/common-common/path"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { CardPreviews } from "../../../../components/card-previews"
import { ICardDetail } from "../../../../schema/card.basic"

export default async function CompareModelsPage() {
  const cardNames = (await promises.readdir(generatedPath)).filter((s) =>
    s.startsWith("wxmp-article"),
  )

  const cards = await Promise.all(
    cardNames.map(async (cardName) => {
      return JSON.parse(
        await promises.readFile(path.join(generatedPath, cardName), {
          encoding: "utf-8",
        }),
      ) as ICardDetail
    }),
  )

  return (
    <FlexContainer id={"container-comp-models"} className={"items-start"}>
      <CardPreviews cards={cards} withActions={false} />
    </FlexContainer>
  )
}
