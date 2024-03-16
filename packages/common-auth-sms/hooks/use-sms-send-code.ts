"use client"

import { useAtom, useSetAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "sonner"
import { uiLoadingAlertDialogAtom } from "../../common-ui/store"
import { $sendSms } from "../server/actions"
import { $sendSmsViaAli } from "../server/providers/ali"
import { $sendSmsViaTencent } from "../server/providers/tencent"
import {
  smsCodeCurCountdownSecondsAtom,
  smsCodeExpireSecondsAtom,
  smsCodeSentOKAtom,
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
  smsSendCodePayloadAtom,
  smsStageAtom,
} from "../store"

export const useSmsSendCode = () => {
  const [smsProviderType] = useAtom(smsProviderTypeAtom)
  const [smsDowntime, setSmsDowntime] = useAtom(smsCodeCurCountdownSecondsAtom)
  const [smsSendPayload] = useAtom(smsSendCodePayloadAtom)
  const [smsCountdownSeconds] = useAtom(smsCodeToCountdownSecondsAtom)
  const [smsExpireSeconds] = useAtom(smsCodeExpireSecondsAtom)

  const setLoading = useSetAtom(uiLoadingAlertDialogAtom)
  const setSmsSentOk = useSetAtom(smsCodeSentOKAtom)
  const setSmsStage = useSetAtom(smsStageAtom)

  const userId = useSession()?.data?.user.id // for link account

  const sendApproach =
    smsProviderType === "ali" ? $sendSmsViaAli : $sendSmsViaTencent
  const { phone } = smsSendPayload

  useEffect(() => {
    if (smsDowntime > 0) {
      setTimeout(() => {
        setSmsDowntime((v) => v - 1)
      }, 1000)
    }
  }, [smsDowntime])

  return async () => {
    setLoading(true)
    const ok = await $sendSms(phone, smsExpireSeconds, sendApproach, userId) // 异步
    setSmsSentOk(ok)
    setLoading(false)

    if (!ok) return toast.error("验证码发送失败，请确认后重试！")

    toast.success("验证码发送成功，请及时查收！")

    setSmsStage("toAuth")
    setSmsDowntime(smsCountdownSeconds)
  }
}
