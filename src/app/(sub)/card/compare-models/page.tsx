import { promises } from "fs"
import path from "path"
import { generatedPath } from "../../../../../packages/common-common/path"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { ICardDetail } from "../../../../schema/card.basic"
import { GenCardPreviews } from "../../../../components/gen-card_frontend"

export default async function CompareModelsPage() {
  const cardNames = [
    "wxmp-article.sample.1712638182102.json",
    "wxmp-article.sample.1712638245494.json",
  ]

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
    <FlexContainer orientation={"horizontal"}>
      <GenCardPreviews cards={cards} />
    </FlexContainer>
  )
}
