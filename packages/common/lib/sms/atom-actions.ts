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
import { lockUIAtom, unlockUIAtom } from "../../store/ui"

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
export const resetSmsDowntimeAtom = atom(null, (get, set) => {
  set(smsDowntimeAtom, SMS_CODE_DOWNTIME)
})
export const decreaseSmsDowntimeAtom = atom(
  (get) => get(smsDowntimeAtom),
  (get, set) => {
    set(smsDowntimeAtom, get(smsDowntimeAtom) - 1)
  },
)
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
