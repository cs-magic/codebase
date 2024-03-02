import { sendCode, smsState } from "@/store/sms"
import { useSnapshot } from "valtio"

export const ResendVerifyCode = () => {
  const { phone, downtime } = useSnapshot(smsState)

  return (
    <div className={"text-muted-foreground text-xs flex items-center "}>
      没有收到验证码？
      {downtime <= 0 ? (
        <span
          onClick={() => {
            void sendCode({ phone })
          }}
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
