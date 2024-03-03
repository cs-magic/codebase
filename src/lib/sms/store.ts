"use client"

import { ISendSms, ISmsSignIn } from "@/schema/sms"
import { signIn } from "next-auth/react"
import { uiState } from "@/store/ui"
import { $sendSms } from "@/lib/sms/server-functions"
import { toast } from "sonner"
import { SMS_CODE_DOWNTIME, SMS_PROVIDER_ID } from "@/config/system"
import { proxy } from "valtio"
import { useAtom } from "jotai"
import { smsProviderAtom } from "@/store/dev.atom"
import { $sendSmsViaAli } from "@/lib/sms/providers/ali"
import { $sendSmsViaTencent } from "@/lib/sms/providers/tencent"

type SmsStage = "toSendSms" | "toAuth"

export interface ISmsState {
  stage: SmsStage
  phone: string
  code: string
  downtime: number
  sentOk?: boolean
  signInOk?: boolean
}

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export const smsState = proxy<ISmsState>({
  stage: "toSendSms",
  phone: "",
  code: "",
  downtime: 0,
  sentOk: false,
  signInOk: false,
})

export const useSendCode = () => {
  const [smsProviderType] = useAtom(smsProviderAtom)

  const sendApproach =
    smsProviderType === "ali" ? $sendSmsViaAli : $sendSmsViaTencent

  return async (data: ISendSms) => {
    const { phone } = data

    smsState.phone = phone

    // UI 跨 store 同步
    uiState.loading = true
    const ok = await $sendSms(phone, sendApproach) // 异步
    uiState.loading = false

    smsState.sentOk = ok
    if (ok) toast.success("验证码发送成功，请及时查收！")
    else toast.error("验证码发送失败！")

    if (ok) {
      smsState.stage = "toAuth"
      smsState.downtime = SMS_CODE_DOWNTIME

      const f = () => {
        if (--smsState.downtime > 0) setTimeout(f, 1000)
      }
      setTimeout(f, 1000)
    }
  }
}

export const addCode = (code: string) => {
  smsState.code += code
  if (smsState.code.length === 6) void smsSignIn()
}

export const delCode = () => {
  smsState.code = ""
}

export const smsSignIn = async () => {
  const values: ISmsSignIn = {
    phone: smsState.phone,
    code: smsState.code,
  }

  console.log("[components] sign in: ", values)
  uiState.loading = true
  const res = await signIn(SMS_PROVIDER_ID, {
    ...values,
    redirect: false,
  })
  uiState.loading = false

  console.log("[components] sign in result: ", res)

  const ok = !!res?.ok
  smsState.signInOk = ok

  if (ok) {
    toast.success("登录成功！")
  } else toast.error("登录失败！")
}
