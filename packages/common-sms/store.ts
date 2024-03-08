import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import {
  userImageAtom,
  userNameAtom,
  userPhoneAtom,
} from "../common-auth/store"
import { Nullable } from "../common-general/schema"
import { ISendSms, ISmsSignIn, SmsProviderType, SmsStage } from "./schema"

//////////////////////////////
// base
//////////////////////////////

export const smsProviderTypeAtom = atomWithStorage<SmsProviderType>(
  "sms.provider.type",
  "ali",
)
export const smsStageAtom = atom<SmsStage>("toSendSms")

export const smsCodeValueAtom = atom("")
export const smsCodeToCountdownSecondsAtom = atomWithStorage(
  "sms.code.countdown",
  60, // seconds
)
export const smsCodeCurCountdownSecondsAtom = atom(0)
export const smsCodeExpireSecondsAtom = atom(10 * 60)

export const smsCodeSentOKAtom = atom<Nullable>(null)

//////////////////////////////
// derived
//////////////////////////////

export const smsSendCodePayloadAtom = atom<ISendSms>((get) => ({
  phone: get(userPhoneAtom),
}))
export const smsSignInPayloadAtom = atom<ISmsSignIn>((get) => ({
  ...get(smsSendCodePayloadAtom),
  code: get(smsCodeValueAtom),
  name: get(userNameAtom),
  image: get(userImageAtom),
}))
