"use server"

import {
  cardLlmResponseSchema,
  ICardLlmResponse,
} from "@cs-magic/prisma/schema/card.detail"
import { prisma } from "@cs-magic/common/deps/db/providers/prisma"

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
