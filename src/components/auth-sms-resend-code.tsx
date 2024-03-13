"use client"
import { useAtom } from "jotai"
import { smsCodeCurCountdownSecondsAtom } from "../../packages/common-auth-sms/store"
import { useSmsSendCode } from "../../packages/common-auth-sms/hooks/use-sms-send-code"

export const SmsResendCode = () => {
  const [downtime] = useAtom(smsCodeCurCountdownSecondsAtom)
  const sendCode = useSmsSendCode()

  return (
    <div className={"text-muted-foreground text-xs flex items-center "}>
      没有收到验证码？
      {downtime <= 0 ? (
        <span
          onClick={sendCode}
          className={"hover:text-primary hover:underline cursor-pointer"}
        >
          重新发送
        </span>
      ) : (
        `(${downtime}秒)`
      )}
    </div>
  )
}
