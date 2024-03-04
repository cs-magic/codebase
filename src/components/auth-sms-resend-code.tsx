"use client"
import { useAtom } from "jotai"
import { smsDowntimeAtom } from "../../packages/common/lib/sms/store"
import { useSmsSendCode } from "../../packages/common/lib/sms/hooks/use-sms-send-code"

export const AuthSmsResendCode = () => {
  const [downtime] = useAtom(smsDowntimeAtom)
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
