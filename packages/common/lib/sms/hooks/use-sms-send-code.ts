import { useAtom } from "jotai"
import { useEffect } from "react"
import { toast } from "sonner"
import { uiLoadingAlertDialogAtom } from "../../../store/ui"
import { $sendSms } from "../server/actions"
import { $sendSmsViaAli } from "../server/providers/ali"
import { $sendSmsViaTencent } from "../server/providers/tencent"
import {
  smsCodeCountdownSecondsAtom,
  smsCodeExpireSecondsAtom,
  smsDowntimeAtom,
  smsProviderTypeAtom,
  smsSendCodePayloadAtom,
  smsSentOKAtom,
  smsStageAtom,
} from "../store"

export const useSmsSendCode = () => {
  const [smsProviderType] = useAtom(smsProviderTypeAtom)
  const [, setLoading] = useAtom(uiLoadingAlertDialogAtom)
  const [, setSmsSentOk] = useAtom(smsSentOKAtom)
  const [, setSmsStage] = useAtom(smsStageAtom)
  const [smsDowntime, setSmsDowntime] = useAtom(smsDowntimeAtom)
  const [smsSendPayload] = useAtom(smsSendCodePayloadAtom)
  const [smsCountdownSeconds] = useAtom(smsCodeCountdownSecondsAtom)
  const [smsExpireSeconds] = useAtom(smsCodeExpireSecondsAtom)

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
    const ok = await $sendSms(phone, smsExpireSeconds, sendApproach) // 异步
    setSmsSentOk(ok)
    setLoading(false)

    if (!ok) return toast.error("验证码发送失败，请确认后重试！")

    toast.success("验证码发送成功，请及时查收！")

    setSmsStage("toAuth")
    setSmsDowntime(smsCountdownSeconds)
  }
}
