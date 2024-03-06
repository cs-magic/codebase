import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Nullable } from "../../schema/base"
import { ISendSms, ISmsSignIn, SmsProviderType, SmsStage } from "./schema"

/**
 * general
 */
export const smsProviderTypeAtom = atomWithStorage<SmsProviderType>(
  "sms.provider.type",
  "ali",
)
export const smsStageAtom = atom<SmsStage>("toSendSms")

export const smsCodeCountdownSecondsAtom = atomWithStorage(
  "sms.code.countdown",
  60,
)
export const smsCodeExpireSecondsAtom = atom(10 * 60)

/**
 * send code
 */
export const smsPhoneAtom = atom("")
export const smsNameAtom = atom<string>("")
export const smsImageAtom = atom("")

export const smsSendCodePayloadAtom = atom<ISendSms>((get) => ({
  phone: get(smsPhoneAtom),
}))
export const smsCodeAtom = atom("")
export const smsSignInPayloadAtom = atom<ISmsSignIn>((get) => ({
  ...get(smsSendCodePayloadAtom),
  code: get(smsCodeAtom),
  name: get(smsNameAtom),
  image: get(smsImageAtom),
}))

export const smsSentOKAtom = atom<Nullable>(null)
export const smsDowntimeAtom = atom(0)

/**
 * sign in
 */
