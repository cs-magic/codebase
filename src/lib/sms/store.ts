"use client"

import { ISmsSignIn } from "@/schema/sms"
import { signIn } from "next-auth/react"
import { $sendSms } from "@/lib/sms/server-functions"
import { toast } from "sonner"
import { SMS_CODE_DOWNTIME, SMS_PROVIDER_ID } from "@/config/system"
import { atom } from "jotai"
import { $sendSmsViaAli } from "@/lib/sms/providers/ali"
import { $sendSmsViaTencent } from "@/lib/sms/providers/tencent"
import { Nullable } from "@/schema/common"
import { lockUIAtom, unlockUIAtom } from "@/store/ui.atom"
import { atomWithStorage } from "jotai/utils"

/**
 * sms basic
 */

export type SmsStage = "toSendSms" | "toAuth"

export type SmsProviderType = "tencent" | "ali"
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
export const inputSmsCodeAtom = atom(null, (get, set, char: string) => {
  const code = get(smsCodeAtom)
  if (code.length >= 6) return
  set(smsCodeAtom, get(smsCodeAtom) + char)
  const newCode = get(smsCodeAtom)
  if (newCode.length === 6) set(smsSignInAtom)
})
export const resetSmsCodeAtom = atom(null, (get, set) => {
  set(smsCodeAtom, "")
})
export const smsDowntimeAtom = atom(0)
export const resetSmsDowntimeAtom = atom(null, (get, set) => {
  set(smsDowntimeAtom, SMS_CODE_DOWNTIME)
})
export const decreaseSmsDowntimeAtom = atom(
  (get) => get(smsDowntimeAtom),
  (get, set) => {
    set(smsDowntimeAtom, get(smsDowntimeAtom) - 1)
  },
)
export const smsSentOKAtom = atom<Nullable>(null)

export const sendCodeAtom = atom(null, async (get, set) => {
  const smsProviderType = get(smsProviderAtom)
  const sendApproach =
    smsProviderType === "ali" ? $sendSmsViaAli : $sendSmsViaTencent

  set(lockUIAtom)
  const phone = get(smsPhoneAtom)
  const ok = await $sendSms(phone, sendApproach) // 异步
  set(smsSentOKAtom, ok)
  set(unlockUIAtom)

  if (!ok) return toast.error("验证码发送失败！")

  toast.success("验证码发送成功，请及时查收！")
  set(smsStageAtom, "toAuth")
  set(resetSmsDowntimeAtom)

  const f = () => {
    console.log("downtime before decreasing: ", get(smsDowntimeAtom))
    set(decreaseSmsDowntimeAtom)
    const downtime = get(smsDowntimeAtom)
    console.log("downtime after decreasing: ", downtime)
    if (downtime > 0) setTimeout(f, 1000)
  }
  setTimeout(f, 1000)
})

/**
 * sign in
 */

export const smsSignOKAtom = atom<Nullable>(null)

export const smsSignInAtom = atom(null, async (get, set) => {
  const name = get(smsNameAtom)
  const phone = get(smsPhoneAtom)
  const code = get(smsCodeAtom)
  const values: ISmsSignIn = {
    phone,
    code,
    name,
  }

  set(lockUIAtom)
  console.log("-- sign in: ", values)
  const res = await signIn(SMS_PROVIDER_ID, {
    ...values,
    redirect: false,
  })
  console.log("-- sign in result: ", res)

  const ok = !!res?.ok
  set(smsSignOKAtom, ok)

  if (ok) {
    toast.success("登录成功！")
  } else toast.error("登录失败！")
  set(unlockUIAtom)
})
