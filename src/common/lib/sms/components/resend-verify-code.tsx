"use client"
import { useAtom, useSetAtom } from "jotai"
import { sendCodeAtom } from "@/common/lib/sms/atom-actions"
import { smsDowntimeAtom } from "@/common/lib/sms/atom-state"

export const ResendVerifyCode = () => {
  const [downtime] = useAtom(smsDowntimeAtom)
  const sendCode = useSetAtom(sendCodeAtom)

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
