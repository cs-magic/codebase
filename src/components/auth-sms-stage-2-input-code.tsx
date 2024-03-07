import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { useKey } from "react-use"
import { toast } from "sonner"
import { Label } from "../../packages/common/components/ui/label"
import { useSmsSignIn } from "../../packages/common/lib/sms/hooks/use-sms-sign-in"
import { smsCodeAtom } from "../../packages/common/lib/sms/store"
import { AuthSmsInputDigits } from "./auth-sms-input-digits"
import { SmsReInputPhone } from "./auth-sms-reinput-phone"
import { SmsResendCode } from "./auth-sms-resend-code"

export const SmsStage2InputCode = () => {
  const [digits, setDigits] = useAtom(smsCodeAtom)

  const refInput = useRef<HTMLInputElement>(null)
  const smsSignIn = useSmsSignIn()

  // 监听数字输入
  for (const digit of "0123456789".split("")) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKey(digit, () => {
      if (digits.length >= 6) return
      setDigits((d) => d + digit)
    })
  }

  // 到达6位时自动触发登录验证
  useEffect(() => {
    if (digits.length !== 6) return
    void smsSignIn()
  }, [digits.length])

  // 监听回车键，清除所有已输入
  useKey("Backspace", () => setDigits(""))

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <input
          autoFocus
          ref={refInput}
          placeholder="000000"
          type={"text"}
          // ref: https://dev.to/madsstoumann/using-a-single-input-for-one-time-code-352l
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={6}
          pattern="\d{6}"
          onChange={(event) => {
            console.log("-- input changed: ", event.currentTarget.value)
            toast.info(`-- input changed: ${event.currentTarget.value}`, {
              duration: 0,
              closeButton: true,
            })
          }}
        />
        <SmsReInputPhone />
      </div>

      {/*<AuthSmsInputDigits />*/}

      <SmsResendCode />
    </div>
  )
}
