export const getConvUrl = (conv: {
  id: string
  currentRequestId: string | null
}) => {
  let url = `/tt/${conv.id}`
  if (conv.currentRequestId) url += `?r=${conv.currentRequestId}`
  return url
}
