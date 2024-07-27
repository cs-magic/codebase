"use client"
import { useSmsSendCode } from "@cs-magic/react-hooks"
import { smsCodeCurCountdownSecondsAtom } from "@cs-magic/react-ui"
import { useAtom } from "jotai"

export const SmsResendCode = () => {
  const [downtime] = useAtom(smsCodeCurCountdownSecondsAtom)
  const sendCode = useSmsSendCode()

  return (
    <div className={"flex items-center text-xs text-muted-foreground "}>
      没有收到验证码？
      {downtime <= 0 ? (
        <span
          onClick={sendCode}
          className={"cursor-pointer hover:text-primary hover:underline"}
        >
          重新发送
        </span>
      ) : (
        `(${downtime}秒)`
      )}
    </div>
  )
}
