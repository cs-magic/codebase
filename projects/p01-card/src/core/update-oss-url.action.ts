"use server";

import { prisma } from "../../../../packages/common-db/providers/prisma";
import { cardDetailSchema, ICardDetail } from "../schema/card.basic";

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
