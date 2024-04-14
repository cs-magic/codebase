import { IWxmpArticleUrlParsed } from "@cs-magic/p01-card/src/core/card-platform/wechat-article/utils";
import { cardDetailSchema } from "@cs-magic/p01-card/src/schema/card.basic";
import { prisma } from "../../common-db/providers/prisma";
import { LlmModelType } from "../../common-llm/schema/providers";

export const findWxmpArticle = async (
  data: IWxmpArticleUrlParsed,
  specificModel?: LlmModelType,
) => {
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
      contentSummary: specificModel
        ? {
            path: ["options", "model"],
            equals: specificModel,
          }
        : undefined,
    },
    ...cardDetailSchema,
  });

  console.log(JSON.stringify({ found, specificModel }, null, 2));

  return found;
};
