import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { ISendSms, ISmsSignIn, SmsProviderType, SmsStage } from "./schema"
import { Nullable } from "../../schema/base" // import { atomWithImmer } from "jotai-immer"

/**
 * general
 */
export const smsProviderTypeAtom = atomWithStorage<SmsProviderType>(
  "sms.provider.type",
  "ali",
)
export const smsStageAtom = atom<SmsStage>("toSendSms")

/**
 * send code
 */
export const smsNameAtom = atom("")
export const smsPhoneAtom = atom("")

export const smsSendCodePayloadAtom = atom<ISendSms>((get) => ({
  phone: get(smsPhoneAtom),
  name: get(smsNameAtom),
}))
export const smsCodeAtom = atom("")
export const smsSignInPayloadAtom = atom<ISmsSignIn>((get) => ({
  ...get(smsSendCodePayloadAtom),
  code: get(smsCodeAtom),
}))

export const smsSentOKAtom = atom<Nullable>(null)
export const smsDowntimeAtom = atom(0)

/**
 * sign in
 */

export const smsSignOKAtom = atom<Nullable>(null)
