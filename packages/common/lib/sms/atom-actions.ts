"use client"

import { atom } from "jotai"
import { $sendSmsViaAli } from "./server/providers/ali"
import { $sendSmsViaTencent } from "./server/providers/tencent"
import { $sendSms } from "./server/actions"
import { toast } from "sonner"
import {
  smsCodeAtom,
  smsDowntimeAtom,
  smsNameAtom,
  smsPhoneAtom,
  smsProviderAtom,
  smsSentOKAtom,
  smsSignOKAtom,
  smsStageAtom,
} from "./atom-state"
import { ISmsSignIn } from "./schema"
import { signIn } from "next-auth/react"
import { SMS_CODE_DOWNTIME, SMS_PROVIDER_ID } from "./coonfig"
import { uiLoadingAlertDialogAtom } from "../../store/ui"

export const smsSignInAtom = atom(null, async (get, set) => {
  const name = get(smsNameAtom)
  const phone = get(smsPhoneAtom)
  const code = get(smsCodeAtom)
  const values: ISmsSignIn = {
    phone,
    code,
    name,
  }

  set(uiLoadingAlertDialogAtom, true)
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
  set(uiLoadingAlertDialogAtom, false)
})
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

export const sendCodeAtom = atom(null, async (get, set) => {
  const smsProviderType = get(smsProviderAtom)
  const sendApproach =
    smsProviderType === "ali" ? $sendSmsViaAli : $sendSmsViaTencent

  set(uiLoadingAlertDialogAtom, true)
  const phone = get(smsPhoneAtom)
  const ok = await $sendSms(phone, sendApproach) // 异步
  set(smsSentOKAtom, ok)
  set(uiLoadingAlertDialogAtom, false)

  if (!ok) return toast.error("验证码发送失败！")

  toast.success("验证码发送成功，请及时查收！")
  set(smsStageAtom, "toAuth")
  set(smsDowntimeAtom, (v) => SMS_CODE_DOWNTIME)

  const f = () => {
    console.log("downtime before decreasing: ", get(smsDowntimeAtom))
    set(smsDowntimeAtom, (v) => --v)
    const downtime = get(smsDowntimeAtom)
    console.log("downtime after decreasing: ", downtime)
    if (downtime > 0) setTimeout(f, 1000)
  }
  setTimeout(f, 1000)
})
