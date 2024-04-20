import { backendApi } from "../../../../../api-client/backend-api"
import { SummaryOptions } from "../nodejs/md2summary"
import { Prisma } from ".prisma/client"

export const fetchWxmpArticleViaFastapi = async (
  url: string,
  options?: SummaryOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  const { data } = await backendApi.get(`/spider/parse-url`, {
    params: {
      url,
      summary_model: options?.model,
      md_with_img: options?.withImage,
    },
  })
  data.time = new Date((data as { time: string }).time)
  return data
}
