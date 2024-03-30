import { Prisma } from "@prisma/client"

export const wechatArticleDetailSchema =
  Prisma.validator<Prisma.WechatArticleDefaultArgs>()({
    include: {
      cover: true,
      user: true,
    },
  })
export type IWechatArticleDetail = Prisma.WechatArticleGetPayload<
  typeof wechatArticleDetailSchema
>
