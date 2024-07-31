import { backendApi } from "@cs-magic/common"
import { Prisma } from "@prisma/client"

import { SummaryOptions } from "./md2summary.js"

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
