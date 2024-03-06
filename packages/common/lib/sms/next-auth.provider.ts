import { userDetailSchema } from "@/schema/user.detail"
import Credentials from "next-auth/providers/credentials"
import { db } from "../db"
import { PROFILE_UPDATE_PROVIDER_ID, SMS_PROVIDER_ID } from "./const"
import { $smsSignIn } from "./server/actions" // // sb tsx 需要用 default

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
    name: { type: "string" },
    phone: { type: "string" },
    code: { type: "string" },
  },
  authorize: (credentials, req) => {
    if (!credentials) throw new Error("no credentials")
    const { code, phone } = credentials
    if (!code || !phone) throw new Error("no phone or code")

    return $smsSignIn(credentials)
  },
})

export const ProfileUpdateProvider = Credentials({
  id: PROFILE_UPDATE_PROVIDER_ID,
  credentials: {
    id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
  },
  authorize: async (credentials, req) => {
    if (!credentials) throw new Error("no credentials")
    const { image, name, id } = credentials
    if (!image || !name) throw new Error("no name or image")

    await db.user.findUniqueOrThrow({ where: { id } })

    return await db.user.update({
      where: { id },
      data: { name, image },
      ...userDetailSchema,
    })
  },
})
