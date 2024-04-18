import { ICardGenOptions } from "@cs-magic/p01-card/src/schema/card"
import { backendApi } from "../../common-api-client/backend-api"
import { Prisma } from ".prisma/client"

export const fetchWxmpArticleViaFastapi = async (
  url: string,
  options?: ICardGenOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  const { data } = await backendApi.get(`/spider/parse-url`, {
    params: {
      url,
      summary_model: options?.summaryModel,
      md_with_img: options?.mdWithImg,
    },
  })
  data.time = new Date((data as { time: string }).time)
  return data
}
