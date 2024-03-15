import Credentials from "next-auth/providers/credentials"
import { prisma } from "../common-db/providers/prisma/connection"
import { SMS_PROVIDER_ID } from "./const"

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

    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          providerAccountId: phone,
          provider: SMS_PROVIDER_ID,
        },
        access_token: code,
      },
      include: { user: true },
    })

    if (!account) throw new Error("account not found")

    return prisma.user.update({
      where: { id: account.userId },
      data: {
        phone,
        phoneVerified: new Date(),
      },
    })
  },
})
