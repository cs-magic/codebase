import { env } from "@/env"
import { ICardGenOptions } from "@/schema/card"
import { backendApi } from "../../common-api-client"
import { Prisma } from ".prisma/client"

export const fetchWxmpArticleViaFastapi = async (
  url: string,
  options?: ICardGenOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  const { data } = await backendApi.get(
    `${env.NEXT_PUBLIC_BACKEND_URL}/spider/parse-url`,
    {
      params: {
        url,
        summary_model: options?.summaryModel,
        md_with_img: options?.mdWithImg,
      },
    },
  )
  data.time = new Date((data as { time: string }).time)
  return data
}
