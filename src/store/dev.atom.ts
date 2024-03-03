import { atomWithStorage } from "jotai/utils"

export type SmsProviderType = "tencent" | "ali"

export const smsProviderAtom = atomWithStorage<SmsProviderType>(
  "sms.provider.type",
  "tencent",
)
