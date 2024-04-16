"use server";

import {
  cardDetailSchema,
  ICardDetail,
} from "@cs-magic/prisma/schema/card.detail";
import { prisma } from "../../../../packages/common-db/providers/prisma";

export const updateOssUrl = async (
  cardId: string,
  ossUrl: string,
): Promise<ICardDetail> => {
  return prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      ossUrl,
    },
    ...cardDetailSchema,
  });
};
