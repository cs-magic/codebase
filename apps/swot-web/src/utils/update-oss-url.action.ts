"use server"

import { prisma } from "@cs-magic/common/db/providers/prisma/connection"
import {
  cardLlmResponseSchema,
  ICardLlmResponse,
} from "@cs-magic/common/schema/card.detail"

export const updateOssUrl = async (
  llmResponseId: string,
  ossUrl: string,
): Promise<ICardLlmResponse> => {
  console.log("-- updateOssUrl: ", { llmResponseId, ossUrl })

  return prisma.llmResponse.update({
    where: {
      id: llmResponseId,
    },
    data: {
      ossUrl,
    },
    ...cardLlmResponseSchema,
  })
}
