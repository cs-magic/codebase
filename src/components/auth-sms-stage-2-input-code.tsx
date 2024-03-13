import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { useSmsSignIn } from "../../packages/common-sms/hooks/use-sms-sign-in"
import { smsCodeAtom } from "../../packages/common-sms/store"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { SMS_DIGIT_SIZE } from "../config/sms"
import { SmsReInputPhone } from "./auth-sms-reinput-phone"
import { SmsResendCode } from "./auth-sms-resend-code"

export const AuthSmsStage2InputCode = () => {
  const [digits, setDigits] = useAtom(smsCodeAtom)

  const refInput = useRef<HTMLInputElement>(null)
  const smsSignIn = useSmsSignIn()

  // 到达6位时自动触发登录验证
  useEffect(() => {
    if (digits.length !== 6) return
    void smsSignIn()
  }, [digits.length])

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <Label className={"w-full h-8 sm:h-12 relative"}>
          <input
            className={"opacity-0 absolute"}
            // hidden // 不能
            autoFocus
            ref={refInput}
            placeholder="000000"
            type={"text"}
            // ref: https://dev.to/madsstoumann/using-a-single-input-for-one-time-code-352l
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            pattern="\d{6}"
            onKeyDown={(event) => {
              const key = event.key
              console.log("onKeyDown key: ", event.key)
              if (/\d/.test(key)) {
                setDigits((d) => d + key)
              } else if (key === "Backspace") {
                setDigits("")
              }
            }}
          />

          <div className={"flex justify-center items-center gap-2 "}>
            <span className={cn("font-black text-primary/75", SMS_DIGIT_SIZE)}>
              M -{" "}
            </span>

            {[...Array(6)].map((value, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-center p-0 border",
                  SMS_DIGIT_SIZE,
                )}
              >
                {index < digits.length ? (
                  digits[index]
                ) : index === digits.length ? (
                  <span className={"cursor"} />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </Label>

        <SmsReInputPhone />
      </div>

      <SmsResendCode />
    </div>
  )
}
