import { SMS_PROVIDER_ID } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/db/prisma.js"
import Credentials from "next-auth/providers/credentials"

export const SmsProvider = Credentials({
  id: SMS_PROVIDER_ID,
  credentials: {
    phone: { type: "string", required: true },
    code: { type: "string", required: true },
  },
  authorize: async (credentials, req) => {
    console.log("sms authorizing with credentials: ", credentials)
    if (!credentials) throw new Error("no credentials")
    const { code, phone } = credentials
    if (!code || !phone) throw new Error("no phone or code")

    const accountInDB = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          providerAccountId: phone,
          provider: SMS_PROVIDER_ID,
        },
      },
    })

    if (!accountInDB) throw new Error("账号尚未注册")

    if (accountInDB.access_token !== code) throw new Error("验证码不对")

    const userInDB = await prisma.user.findUnique({ where: { phone } })

    if (userInDB && userInDB.id !== accountInDB.userId)
      throw new Error("账号已存在")

    return prisma.user.update({
      where: { id: accountInDB.userId },
      data: {
        phone,
        phoneVerified: new Date(),
      },
    })
  },
})
