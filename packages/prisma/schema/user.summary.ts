import { Prisma } from "@prisma/client"

export const userSummarySchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    image: true,
    name: true,
  },
})
export type IUserSummary = Prisma.UserGetPayload<typeof userSummarySchema> & {
  // compatible
  avatar?: string
}

export type IUserSummaryFilled = {
  name: string
  image: string
}

export const convertUserSummary = (
  user: IUserSummary,
): IUserSummaryFilled | null => {
  const avatar = user.avatar ?? user.image
  if (user.name && avatar)
    return {
      name: user.name,
      image: avatar,
    }
  return null
}

export const wechatMessageDetailSchema =
  Prisma.validator<Prisma.WechatMessageDefaultArgs>()({
    include: {
      talker: true,
      listener: true,
      room: true,
    },
  })
export type IWechatMessageDetail = Prisma.WechatMessageGetPayload<
  typeof wechatMessageDetailSchema
>
