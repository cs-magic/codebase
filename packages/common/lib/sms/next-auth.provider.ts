import Credentials from "next-auth/providers/credentials"
import { SMS_PROVIDER_ID } from "./const"
import { $smsSignIn } from "./server/actions"

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
