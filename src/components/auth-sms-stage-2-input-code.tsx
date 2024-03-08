import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { useKey } from "react-use"
import { Label } from "../../packages/common/components/ui/label"
import { useSmsSignIn } from "../../packages/common/lib/sms/hooks/use-sms-sign-in"
import { smsCodeAtom } from "../../packages/common/lib/sms/store"
import { cn } from "../../packages/common/lib/utils"
import { SMS_DIGIT_SIZE } from "../config/sms"
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
            onChange={(event) => {
              setDigits(event.currentTarget.value)
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
