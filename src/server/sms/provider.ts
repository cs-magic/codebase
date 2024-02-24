import { $smsSignIn } from "@/server/sms/functions"
import { SMS_PROVIDER_ID } from "@/config/system"

import CredentialsModule from "next-auth/providers/credentials"

// sb tsx 需要用 default
const Credentials = (
  "default" in CredentialsModule ? CredentialsModule.default : CredentialsModule
) as typeof CredentialsModule

console.log({ Credentials })

export const SmsProvider = Credentials({
  id: SMS_PROVIDER_ID,
  credentials: {
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
