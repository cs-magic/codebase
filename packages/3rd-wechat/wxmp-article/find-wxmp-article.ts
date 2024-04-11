import { IWxmpArticleUrlParsed } from "@/core/card-platform/wechat-article/utils"
import { cardDetailSchema } from "@/schema/card.basic"
import { prisma } from "../../common-db/providers/prisma"

export const findWxmpArticle = async (data: IWxmpArticleUrlParsed) => {
  const found = await prisma.card.findFirst({
    where: {
      OR: [
        {
          platformId: data.platformId ?? "",
        },
        {
          // json filter, ref: https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields#filter-on-nested-object-property
          platformData: {
            path: ["sn"],
            equals: data.platformData.sn ?? "",
          },
        },
      ],
    },
    ...cardDetailSchema,
  })

  // console.log(JSON.stringify({ found }, null, 2))

  return found
}
