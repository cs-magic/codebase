import Credentials from "next-auth/providers/credentials"
import { prisma } from "../common-db/providers/prisma/connection"
import { SMS_PROVIDER_ID } from "./const" // // sb tsx 需要用 default

// // sb tsx 需要用 default
// import CredentialsModule from "next-auth/providers/credentials"
// const Credentials = (
//   "default" in CredentialsModule ? CredentialsModule.default : CredentialsModule
// ) as typeof CredentialsModule
//
// console.log({ Credentials })

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
