"use server"

import { cardLlmResponseSchema, ICardLlmResponse } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/db/prisma.js"

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
