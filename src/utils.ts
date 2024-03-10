import { IBaseResponse } from "./schema/query"
import { ResponseStatus } from "./schema/sse"

export const getConvUrl = (conv: {
  id: string
  currentRequestId: string | null
}) => {
  let url = `/tt/${conv.id}`
  if (conv.currentRequestId) url += `?r=${conv.currentRequestId}`
  return url
}

export const checkRespondingStatus = (
  response?: null | IBaseResponse,
): ResponseStatus => {
  if (!response) return "unknown"
  if (!response.tStart) return "to-response"
  if (response.tEnd) return "responded"
  return "responding"
}
