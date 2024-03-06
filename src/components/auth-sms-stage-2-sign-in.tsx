import { useAtom } from "jotai"
import { useEffect } from "react"
import { useKey } from "react-use"
import { Label } from "../../packages/common/components/ui/label"
import { useSmsSignIn } from "../../packages/common/lib/sms/hooks/use-sms-sign-in"
import { smsCodeAtom } from "../../packages/common/lib/sms/store"
import { AuthSmsInputDigits } from "./auth-sms-input-digits"
import { AuthSmsReinputPhone } from "./auth-sms-reinput-phone"
import { AuthSmsResendCode } from "./auth-sms-resend-code"

export const SmsSignIn = () => {
  const [digits, setDigits] = useAtom(smsCodeAtom)

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

        <AuthSmsReinputPhone />
      </div>

      <AuthSmsInputDigits />

      <AuthSmsResendCode />
    </div>
  )
}
