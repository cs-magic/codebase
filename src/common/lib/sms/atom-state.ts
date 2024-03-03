"use client"

import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { SmsProviderType, SmsStage } from "@/common/lib/sms/schema"
import { Nullable } from "@/common/schema/base"

/**
 * general
 */
export const smsProviderAtom = atomWithStorage<SmsProviderType>(
  "sms.provider.type",
  "tencent",
)
export const smsStageAtom = atom<SmsStage>("toSendSms")

/**
 * send code
 */
export const smsNameAtom = atom("")
export const smsPhoneAtom = atom("")
export const smsCodeAtom = atom("")
export const smsSentOKAtom = atom<Nullable>(null)
export const smsDowntimeAtom = atom(0)

/**
 * sign in
 */

export const smsSignOKAtom = atom<Nullable>(null)
